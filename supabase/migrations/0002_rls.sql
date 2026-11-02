-- NETYAR — phase 4: Row Level Security for the multi-tenant tables.
-- Idempotent: drops and recreates each policy. Run after 0001_schema.sql.

alter table public.profiles enable row level security;
alter table public.cafes enable row level security;
alter table public.cafe_members enable row level security;

-- ---------------------------------------------------------------------------
-- profiles
-- ---------------------------------------------------------------------------
drop policy if exists profiles_select_self_or_coworkers on public.profiles;
create policy profiles_select_self_or_coworkers on public.profiles
for select to authenticated
using (id = auth.uid() or public.shares_cafe_with(id));

-- Users may edit only their own profile row.
drop policy if exists profiles_update_self on public.profiles;
create policy profiles_update_self on public.profiles
for update to authenticated
using (id = auth.uid())
with check (id = auth.uid());

-- No insert/delete policy: rows are created by the auth trigger (SECURITY
-- DEFINER) and removed by the auth.users cascade.

-- ---------------------------------------------------------------------------
-- cafes: visible only to their members.
-- ---------------------------------------------------------------------------
drop policy if exists cafes_select_members on public.cafes;
create policy cafes_select_members on public.cafes
for select to authenticated
using (public.is_cafe_member(id));

drop policy if exists cafes_update_managers on public.cafes;
create policy cafes_update_managers on public.cafes
for update to authenticated
using (public.can_manage_cafe(id))
with check (public.can_manage_cafe(id));

drop policy if exists cafes_delete_owner on public.cafes;
create policy cafes_delete_owner on public.cafes
for delete to authenticated
using (public.cafe_role_of(id) = 'owner');

-- Insert happens through public.create_cafe() only.

-- ---------------------------------------------------------------------------
-- cafe_members: members see the roster of their own cafes; owners/managers
-- manage it, and only an owner can grant the owner role.
-- ---------------------------------------------------------------------------
drop policy if exists cafe_members_select_members on public.cafe_members;
create policy cafe_members_select_members on public.cafe_members
for select to authenticated
using (public.is_cafe_member(cafe_id));

drop policy if exists cafe_members_insert_managers on public.cafe_members;
create policy cafe_members_insert_managers on public.cafe_members
for insert to authenticated
with check (
  public.can_manage_cafe(cafe_id)
  and (role <> 'owner' or public.cafe_role_of(cafe_id) = 'owner')
);

drop policy if exists cafe_members_update_managers on public.cafe_members;
create policy cafe_members_update_managers on public.cafe_members
for update to authenticated
using (public.can_manage_cafe(cafe_id))
with check (
  public.can_manage_cafe(cafe_id)
  and (role <> 'owner' or public.cafe_role_of(cafe_id) = 'owner')
);

drop policy if exists cafe_members_delete_managers on public.cafe_members;
create policy cafe_members_delete_managers on public.cafe_members
for delete to authenticated
using (public.can_manage_cafe(cafe_id) and role <> 'owner');

-- ---------------------------------------------------------------------------
-- Privileges: RLS decides the rows, these grants decide the verbs.
-- anon gets no table access; only the signup duplicate check RPC.
-- ---------------------------------------------------------------------------
revoke all on public.profiles from anon;
revoke all on public.cafes from anon;
revoke all on public.cafe_members from anon;

grant select, update on public.profiles to authenticated;
grant select, update, delete on public.cafes to authenticated;
grant select, insert, update, delete on public.cafe_members to authenticated;

grant execute on function public.is_phone_registered(text) to anon, authenticated;
grant execute on function public.create_cafe(text, text) to authenticated;
grant execute on function public.is_cafe_member(uuid) to authenticated;
grant execute on function public.cafe_role_of(uuid) to authenticated;
grant execute on function public.can_manage_cafe(uuid) to authenticated;
grant execute on function public.shares_cafe_with(uuid) to authenticated;
