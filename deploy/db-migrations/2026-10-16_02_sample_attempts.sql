-- 2026-10-16 (2) · Colegio «sample»: los intentos SÍ se guardan, pero aparte.
--
-- La 2026-10-16_01 los descartaba (se quedaban en el navegador). Ahora el
-- trigger trg_local_results los desvía a public.sample_attempts: quedan
-- guardados (My Progress del alumno, panel del admin) sin entrar en
-- exam_attempts / activity_attempts, que es de donde salen los resultados
-- reales y las colas de «pendiente de corregir» de los colegios.
-- También enciende el periódico (news.daily) en el sample.

create table if not exists public.sample_attempts (
  id           uuid primary key default gen_random_uuid(),
  student_id   uuid not null references public.profiles(id) on delete cascade,
  school_id    uuid references public.schools(id) on delete cascade,
  source       text not null check (source in ('exam_attempts', 'activity_attempts')),
  row          jsonb not null,
  submitted_at timestamptz not null default now()
);
create index if not exists sample_attempts_student_idx on public.sample_attempts (student_id, submitted_at desc);

alter table public.sample_attempts enable row level security;

drop policy if exists sample_attempts_select on public.sample_attempts;
create policy sample_attempts_select on public.sample_attempts for select to authenticated
  using (student_id = auth.uid()
         or public.is_superadmin()
         or (public.is_admin() and school_id = public.my_school_id()));
-- Sin políticas de insert/update/delete: solo escribe el trigger (security definer).

create or replace function public.drop_local_results()
 returns trigger
 language plpgsql
 security definer
 set search_path to 'public'
as $function$
begin
  if public.school_local_results(new.student_id) then
    insert into public.sample_attempts (student_id, school_id, source, row)
    values (new.student_id,
            (select school_id from public.profiles where id = new.student_id),
            tg_table_name, to_jsonb(new));
    return null;
  end if;
  return new;
end;
$function$;

update public.school_content
   set enabled = true
 where item_key = 'news.daily'
   and school_id = (select id from public.schools where slug = 'sample');
