-- 2026-09-26_02_consola_superadmin.sql
-- CONSOLA DEL SUPERADMINISTRADOR (26-sep-2026). Cohasset School es un producto
-- para muchos colegios y un solo dueño. El superadmin necesita, además de la
-- marca y las apps de cada colegio (migración _01), llevar el CICLO DE VIDA
-- comercial: en qué estado está cada colegio, cuánto paga, si pagó, con quién
-- se habla y qué se quedó pendiente. Y poder dar de alta un colegio nuevo
-- COPIANDO el modelo (NIS es el primer modelo: sus apps y su configuración).
--
--   schools             gana status/plan/cuota/moneda/día de cobro/tope de
--                       alumnos/settings y `template_of` (de qué modelo nació).
--   school_contacts     personas del colegio (dirección, coordinación, TI…).
--   school_payments     una fila por periodo cobrado: pendiente, pagado,
--                       vencido o anulado.
--   school_interactions bitácora comercial: llamada, WhatsApp, correo,
--                       reunión, nota; con próxima acción y fecha.
--
-- Todo esto lo lee y escribe SOLO el superadmin (is_superadmin()); un admin de
-- colegio no ve ni su propia factura desde aquí. Molde de RLS: una política por
-- acción, auth.uid() en subconsulta, revoke a anon.

-- ---------------------------------------------------------------- schools
alter table public.schools
  add column if not exists status        text not null default 'trial'
      check (status in ('trial','active','suspended','churned')),
  add column if not exists plan          text not null default 'standard',
  add column if not exists trial_ends_at date,
  add column if not exists students_cap  integer,
  add column if not exists monthly_fee   numeric(10,2) not null default 0,
  add column if not exists currency      text not null default 'PEN' check (currency in ('PEN','USD')),
  add column if not exists billing_day   smallint not null default 1 check (billing_day between 1 and 28),
  add column if not exists template_of   uuid references public.schools(id),
  add column if not exists notes         text;

-- `active` (el interruptor que lee school_public) sigue al estado comercial:
-- un colegio suspendido o dado de baja deja de servirse.
create or replace function public.schools_sync_active() returns trigger
language plpgsql as $$
begin
  new.active := new.status in ('trial','active');
  new.updated_at := now();
  return new;
end $$;
revoke execute on function public.schools_sync_active() from public, anon, authenticated;
drop trigger if exists schools_sync_active on public.schools;
create trigger schools_sync_active before insert or update on public.schools
  for each row execute function public.schools_sync_active();

-- NIS es el primer cliente y el primer modelo.
update public.schools
   set status = 'active', plan = 'school',
       settings = settings || jsonb_build_object(
         'grades', '[1,2,3,4,5,6,7,8,9,10,11]'::jsonb,
         'sections', '["A","B"]'::jsonb,
         'academic_year', 2026,
         'lang', 'en')
 where slug = 'nis';
update public.schools set status = 'trial', plan = 'demo' where slug = 'demo';

-- ---------------------------------------------------------------- contactos
create table if not exists public.school_contacts (
  id         uuid primary key default gen_random_uuid(),
  school_id  uuid not null references public.schools(id) on delete cascade,
  name       text not null,
  position   text,              -- Directora, Coordinadora de inglés, TI…
  email      text,
  phone      text,
  whatsapp   text,
  is_primary boolean not null default false,
  notes      text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists school_contacts_school_idx on public.school_contacts (school_id);

-- ---------------------------------------------------------------- pagos
create table if not exists public.school_payments (
  id           uuid primary key default gen_random_uuid(),
  school_id    uuid not null references public.schools(id) on delete cascade,
  period_start date not null,
  period_end   date not null,
  amount       numeric(10,2) not null,
  currency     text not null default 'PEN' check (currency in ('PEN','USD')),
  status       text not null default 'pending' check (status in ('pending','paid','overdue','void')),
  due_date     date not null,
  paid_at      date,
  method       text,            -- transferencia, Yape, tarjeta…
  reference    text,            -- n.º de operación / factura
  notes        text,
  created_by   uuid references public.profiles(id),
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now(),
  unique (school_id, period_start)
);
create index if not exists school_payments_school_idx on public.school_payments (school_id, due_date);

-- ---------------------------------------------------------------- bitácora
create table if not exists public.school_interactions (
  id             uuid primary key default gen_random_uuid(),
  school_id      uuid not null references public.schools(id) on delete cascade,
  contact_id     uuid references public.school_contacts(id) on delete set null,
  kind           text not null default 'note' check (kind in ('call','whatsapp','email','meeting','visit','note')),
  happened_at    timestamptz not null default now(),
  summary        text not null,
  next_action    text,
  next_action_at date,
  done           boolean not null default false,
  created_by     uuid references public.profiles(id),
  created_at     timestamptz not null default now()
);
create index if not exists school_interactions_school_idx on public.school_interactions (school_id, happened_at desc);
create index if not exists school_interactions_next_idx   on public.school_interactions (next_action_at) where next_action is not null and not done;

-- ---------------------------------------------------------------- RLS
alter table public.school_contacts     enable row level security;
alter table public.school_payments     enable row level security;
alter table public.school_interactions enable row level security;

drop policy if exists school_contacts_sel on public.school_contacts;
create policy school_contacts_sel on public.school_contacts for select to authenticated using ( public.is_superadmin() );
drop policy if exists school_contacts_write on public.school_contacts;
create policy school_contacts_write on public.school_contacts for all to authenticated
  using ( public.is_superadmin() ) with check ( public.is_superadmin() );

drop policy if exists school_payments_sel on public.school_payments;
create policy school_payments_sel on public.school_payments for select to authenticated using ( public.is_superadmin() );
drop policy if exists school_payments_write on public.school_payments;
create policy school_payments_write on public.school_payments for all to authenticated
  using ( public.is_superadmin() ) with check ( public.is_superadmin() );

drop policy if exists school_interactions_sel on public.school_interactions;
create policy school_interactions_sel on public.school_interactions for select to authenticated using ( public.is_superadmin() );
drop policy if exists school_interactions_write on public.school_interactions;
create policy school_interactions_write on public.school_interactions for all to authenticated
  using ( public.is_superadmin() ) with check ( public.is_superadmin() );

revoke all on public.school_contacts     from anon;
revoke all on public.school_payments     from anon;
revoke all on public.school_interactions from anon;

-- ---------------------------------------------------------------- alta desde un modelo
-- Crea un colegio copiando de otro (NIS por defecto) sus apps encendidas, su
-- plan y su configuración (grados, secciones, año, idioma). La marca NO se
-- copia: el colegio nuevo nace con la marca neutra de Cohasset School hasta
-- que el superadmin le suba la suya.
create or replace function public.school_create_from_template(
  p_slug text, p_name text, p_short text default null, p_domain text default null,
  p_template uuid default '00000000-0000-4000-8000-000000000001')
returns uuid language plpgsql security definer set search_path = public as $$
declare nid uuid;
begin
  if not public.is_superadmin() then
    raise exception 'Only the platform superadmin can create schools';
  end if;
  insert into public.schools (slug, name, short_name, domain, logo_url, logo_dark_url, accent,
                              is_demo, status, plan, settings, template_of)
  select lower(p_slug), p_name, coalesce(p_short, p_name),
         coalesce(nullif(lower(p_domain), ''), lower(p_slug) || '.cohasset.pe'),
         'assets/cohasset-school.svg?v=5', 'assets/cohasset-school-white.svg?v=5', '#2563EB',
         false, 'trial', t.plan, t.settings, t.id
    from public.schools t where t.id = p_template
  returning id into nid;
  if nid is null then raise exception 'Template school not found'; end if;
  insert into public.school_apps (school_id, app_key, enabled)
  select nid, app_key, enabled from public.school_apps where school_id = p_template;
  return nid;
end $$;
revoke execute on function public.school_create_from_template(text, text, text, text, uuid) from public, anon;
grant  execute on function public.school_create_from_template(text, text, text, text, uuid) to authenticated;

-- ---------------------------------------------------------------- cobro del mes
-- Genera la fila pendiente del periodo para cada colegio activo con cuota > 0
-- que aún no la tenga. p_period = primer día del mes. Idempotente.
create or replace function public.school_payments_generate(p_period date default date_trunc('month', current_date)::date)
returns integer language plpgsql security definer set search_path = public as $$
declare n integer;
begin
  if not public.is_superadmin() then
    raise exception 'Only the platform superadmin can generate invoices';
  end if;
  insert into public.school_payments (school_id, period_start, period_end, amount, currency, status, due_date, created_by)
  select s.id, p_period, (p_period + interval '1 month' - interval '1 day')::date,
         s.monthly_fee, s.currency, 'pending',
         (p_period + (s.billing_day - 1) * interval '1 day')::date, auth.uid()
    from public.schools s
   where s.status = 'active' and s.monthly_fee > 0
  on conflict (school_id, period_start) do nothing;
  get diagnostics n = row_count;
  -- Lo pendiente cuya fecha ya pasó, a vencido.
  update public.school_payments set status = 'overdue', updated_at = now()
   where status = 'pending' and due_date < current_date;
  return n;
end $$;
revoke execute on function public.school_payments_generate(date) from public, anon;
grant  execute on function public.school_payments_generate(date) to authenticated;
