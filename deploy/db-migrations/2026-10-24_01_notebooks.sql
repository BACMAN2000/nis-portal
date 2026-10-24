-- ============================================================================
-- notebooks — el cuaderno digital de la pestaña «Notebook» (lit-tools.js, que
-- también cargan las páginas de cohasset.pe). Una fila por persona con todas sus
-- notas en JSON [{id,text,quote,src,url,created,updated,deleted?}]; la página
-- fusiona nota a nota con su copia local (gana la más reciente).
--   · Solo el dueño lee y escribe su cuaderno (son apuntes personales).
--   · Multi-colegio: school_id + tenant_fill + política RESTRICTIVA _tenant.
-- ============================================================================

create table if not exists public.notebooks (
  profile_id uuid primary key references public.profiles(id) on delete cascade default auth.uid(),
  school_id  uuid not null,
  notes      jsonb not null default '[]'::jsonb check (jsonb_typeof(notes) = 'array' and pg_column_size(notes) < 1500000),
  updated_at timestamptz not null default now()
);

drop trigger if exists tenant_fill on public.notebooks;
create trigger tenant_fill before insert on public.notebooks
  for each row execute function public.tenant_fill('profile_id');

alter table public.notebooks enable row level security;

drop policy if exists notebooks_lee on public.notebooks;
create policy notebooks_lee on public.notebooks
  for select to authenticated using (profile_id = (select auth.uid()));

drop policy if exists notebooks_inserta on public.notebooks;
create policy notebooks_inserta on public.notebooks
  for insert to authenticated with check (profile_id = (select auth.uid()));

drop policy if exists notebooks_actualiza on public.notebooks;
create policy notebooks_actualiza on public.notebooks
  for update to authenticated
  using (profile_id = (select auth.uid())) with check (profile_id = (select auth.uid()));

drop policy if exists notebooks_tenant on public.notebooks;
create policy notebooks_tenant on public.notebooks
  as restrictive for all to authenticated
  using ((school_id = (select public.my_school_id())) or public.is_superadmin())
  with check ((school_id = (select public.my_school_id())) or public.is_superadmin());

grant select, insert, update on public.notebooks to authenticated;
