-- 2026-10-16 · Colegio «sample»: sin resultados en la base y dos ejercicios por nivel.
--
-- 1. settings.local_results = true → los intentos de sus cuentas no se guardan:
--    un trigger BEFORE INSERT en exam_attempts y activity_attempts los descarta
--    en silencio (devuelve NULL, sin error para el cliente). El portal y los
--    motores ya los guardan en el navegador (cohSampleResults:<uid>); esto es la
--    red por si una versión vieja en caché intenta escribir.
-- 2. Se borran los intentos que ya hubiera de cuentas sample (pruebas del 15-oct:
--    un Writing B2 «pendiente de corregir»).
-- 3. Recorte: Practice 1 y 2 y MOCK 1 y 2 de cada nivel; dos bloques de cada
--    nivel en las herramientas de léxico (sin «levels» = todos los niveles).

update public.schools
   set settings = settings || '{"local_results":true}'::jsonb
 where slug = 'sample';

create or replace function public.school_local_results(p_uid uuid)
 returns boolean
 language sql
 stable security definer
 set search_path to 'public'
as $function$
  select coalesce((select (s.settings->>'local_results')::boolean
                     from public.profiles p join public.schools s on s.id = p.school_id
                    where p.id = p_uid), false);
$function$;

create or replace function public.drop_local_results()
 returns trigger
 language plpgsql
 security definer
 set search_path to 'public'
as $function$
begin
  if public.school_local_results(new.student_id) then
    return null;
  end if;
  return new;
end;
$function$;

drop trigger if exists trg_local_results on public.exam_attempts;
create trigger trg_local_results before insert on public.exam_attempts
  for each row execute function public.drop_local_results();

drop trigger if exists trg_local_results on public.activity_attempts;
create trigger trg_local_results before insert on public.activity_attempts
  for each row execute function public.drop_local_results();

delete from public.exam_attempts
 where student_id in (select p.id from public.profiles p join public.schools s on s.id = p.school_id where s.slug = 'sample');
delete from public.activity_attempts
 where student_id in (select p.id from public.profiles p join public.schools s on s.id = p.school_id where s.slug = 'sample');

update public.school_content sc
   set scope = case
         when sc.item_key like 'practice.%' then '{"tests":["practice","practice2"]}'::jsonb
         when sc.item_key like 'mock.%'     then '{"tests":["mock01","mock02"]}'::jsonb
         else '{"blocks":2}'::jsonb
       end
  from public.schools s
 where s.id = sc.school_id and s.slug = 'sample' and sc.scope is not null;

update public.schools
   set notes = 'Muestra para enseñar a colegios: Practice 1-2 y MOCK 1-2 por nivel, dos bloques de cada nivel en las herramientas de léxico, IELTS Writing. Sin resultados en la base: se quedan en el navegador.'
 where slug = 'sample';
