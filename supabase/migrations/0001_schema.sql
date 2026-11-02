-- NETYAR — phase 4: multi-tenant schema (profiles / cafes / cafe_members)
-- Idempotent: safe to run more than once. Apply with `psql "$SUPABASE_DB_URL" -f ...`
-- or paste into the Supabase SQL editor.

create extension if not exists pgcrypto;

-- ---------------------------------------------------------------------------
-- profiles: one row per auth user, filled by the trigger below.
-- ---------------------------------------------------------------------------
create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  full_name text not null check (char_length(btrim(full_name)) between 2 and 120),
  phone text unique check (phone is null or phone ~ '^09[0-9]{9}$'),
  email text,
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- cafes + membership roles
-- ---------------------------------------------------------------------------
do $$
begin
  create type public.cafe_role as enum ('owner', 'manager', 'employee');
exception
  when duplicate_object then null;
end $$;

create table if not exists public.cafes (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(btrim(name)) between 2 and 120),
  owner_id uuid not null references auth.users (id) on delete restrict,
  city text check (city is null or char_length(btrim(city)) <= 80),
  created_at timestamptz not null default now()
);

create index if not exists cafes_owner_id_idx on public.cafes (owner_id);

create table if not exists public.cafe_members (
  id uuid primary key default gen_random_uuid(),
  cafe_id uuid not null references public.cafes (id) on delete cascade,
  user_id uuid not null references auth.users (id) on delete cascade,
  role public.cafe_role not null default 'employee',
  created_at timestamptz not null default now(),
  constraint cafe_members_unique_member unique (cafe_id, user_id)
);

create index if not exists cafe_members_user_id_idx on public.cafe_members (user_id);
create index if not exists cafe_members_cafe_id_idx on public.cafe_members (cafe_id);

-- A cafe has exactly one owner.
create unique index if not exists cafe_members_single_owner_idx
  on public.cafe_members (cafe_id)
  where role = 'owner';

-- ---------------------------------------------------------------------------
-- Helpers. SECURITY DEFINER so policies can look at membership rows the
-- caller could not read directly (prevents recursive RLS).
-- ---------------------------------------------------------------------------
create or replace function public.is_cafe_member(p_cafe_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.cafe_members m
    where m.cafe_id = p_cafe_id and m.user_id = auth.uid()
  );
$$;

create or replace function public.cafe_role_of(p_cafe_id uuid)
returns public.cafe_role
language sql
stable
security definer
set search_path = public
as $$
  select m.role from public.cafe_members m
  where m.cafe_id = p_cafe_id and m.user_id = auth.uid()
  limit 1;
$$;

create or replace function public.can_manage_cafe(p_cafe_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select coalesce(public.cafe_role_of(p_cafe_id) in ('owner', 'manager'), false);
$$;

create or replace function public.shares_cafe_with(p_user_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.cafe_members me
    join public.cafe_members them on them.cafe_id = me.cafe_id
    where me.user_id = auth.uid() and them.user_id = p_user_id
  );
$$;

-- ---------------------------------------------------------------------------
-- New auth user -> profile row (also used as the server-side phone check).
-- ---------------------------------------------------------------------------
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  v_full_name text := nullif(btrim(coalesce(new.raw_user_meta_data ->> 'full_name', '')), '');
  v_phone text := nullif(btrim(coalesce(new.raw_user_meta_data ->> 'mobile', '')), '');
begin
  insert into public.profiles (id, full_name, phone, email)
  values (new.id, coalesce(v_full_name, 'کاربر نت‌یار'), v_phone, new.email)
  on conflict (id) do update
    set full_name = excluded.full_name,
        phone = excluded.phone,
        email = excluded.email;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute function public.handle_new_user();

-- Signup duplicate check for the mobile number (profiles.phone is unique).
create or replace function public.is_phone_registered(p_phone text)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (select 1 from public.profiles p where p.phone = p_phone);
$$;

-- ---------------------------------------------------------------------------
-- Cafe creation: one atomic server-side call (cafe + owner membership).
-- Direct inserts into cafes/cafe_members are not granted to clients.
-- ---------------------------------------------------------------------------
create or replace function public.create_cafe(p_name text, p_city text default null)
returns public.cafes
language plpgsql
security definer
set search_path = public
as $$
declare
  v_user uuid := auth.uid();
  v_name text := btrim(coalesce(p_name, ''));
  v_city text := nullif(btrim(coalesce(p_city, '')), '');
  v_cafe public.cafes;
begin
  if v_user is null then
    raise exception 'not_authenticated' using errcode = '42501';
  end if;
  if char_length(v_name) < 2 then
    raise exception 'invalid_cafe_name' using errcode = '22023';
  end if;
  if v_city is not null and char_length(v_city) > 80 then
    raise exception 'invalid_city' using errcode = '22023';
  end if;

  insert into public.cafes (name, owner_id, city)
  values (v_name, v_user, v_city)
  returning * into v_cafe;

  insert into public.cafe_members (cafe_id, user_id, role)
  values (v_cafe.id, v_user, 'owner');

  return v_cafe;
end;
$$;
