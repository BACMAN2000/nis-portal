-- 2026-09-17 · Idioma de la interfaz por usuario (Fase 1: inglés + botón español).
-- Aplicada en producción el 17-sep-2026 vía MCP (apply_migration profiles_ui_lang).
--
-- El botón 🌐 (nis-i18n.js + nis-tema.js) guarda la preferencia en localStorage y,
-- con sesión, app.js la copia aquí para que siga al alumno de un equipo a otro.
-- La escribe el propio usuario en su fila: profiles_update ya lo permite y el
-- trigger guard_profile_privileged_cols no vigila esta columna a propósito.

alter table public.profiles add column if not exists ui_lang text
  check (ui_lang in ('en','es'));
comment on column public.profiles.ui_lang is
  'Idioma de la interfaz (en|es) elegido con el botón 🌐; NULL = inglés por defecto.';
