# Supabase migrations — NETYAR phase 4

Two idempotent SQL files, applied in order:

| File | What it creates |
| --- | --- |
| `0001_schema.sql` | `profiles`, `cafes`, `cafe_members` (+ enum, constraints, indexes), `public.handle_new_user()` trigger on `auth.users`, and the `create_cafe` / `is_phone_registered` RPCs |
| `0002_rls.sql` | RLS on all three tables, membership-based policies, table privileges |

## Apply

Either paste both files into **Supabase → SQL Editor** in order, or run them with
`psql` against the project's connection string (Session pooler URI from
**Project Settings → Database**):

```bash
psql "$SUPABASE_DB_URL" -v ON_ERROR_STOP=1 -f supabase/migrations/0001_schema.sql
psql "$SUPABASE_DB_URL" -v ON_ERROR_STOP=1 -f supabase/migrations/0002_rls.sql
```

In the sandbox the same thing runs through the compose `migrate` profile, which
reads `SUPABASE_DB_URL` from the platform secret store:

```bash
docker compose -f docker-compose.base44.yml --profile tools run --rm migrate
```

## Security model

- Every table has RLS enabled. `profiles`, `cafes` and `cafe_members` have no
  policy that would expose rows across cafés.
- Membership checks go through `SECURITY DEFINER` helpers (`is_cafe_member`,
  `cafe_role_of`, `can_manage_cafe`, `shares_cafe_with`) so policies can read
  membership rows without recursive RLS.
- Cafés are created only through `create_cafe()`, which inserts the café and its
  `owner` membership in one transaction. Clients have no `INSERT` grant on
  `cafes` or `cafe_members` used for that path.
- Roles: `owner` (single per café, can delete the café and grant any role),
  `manager` (can edit the café and manage non-owner members), `employee`
  (read access only).
- Profile rows are written by the `auth.users` trigger; a user may only update
  their own profile.

## Verify

```sql
-- as an authenticated user (JWT claims set), only their cafés are visible:
select id, name from public.cafes;
```
