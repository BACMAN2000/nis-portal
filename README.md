# Portal NIS — Nordic International School of Lima

Web portal (admin · teacher · student) with Supabase backend, on-brand (Nordic colors + Gotham), that hosts the MOCKS CAMBRIDGE quizzes and monitors each student's progress and projection.

## Stack
- **Frontend:** static HTML/CSS/JS (no build), Supabase JS v2 from CDN. Host: GitHub Pages.
- **Backend:** Supabase project `nis-portal` (`kjrppibltkbflvxmiyib`) — Postgres + Auth + RLS.
- **Brand:** colors `#4987c6 / #f2f3ff / #636465 / #d1d2ea / #76cbe5 / #d2909b`; font Gotham (self-hosted in `fonts/`); logos in `assets/`.

## Roles & data
- `profiles` (role: admin/teacher/student) + `grades` (G1–G11) + `student_credentials` (admin-only visible password) + `exam_attempts` + `student_progress` view. RLS by role.
- Admins are auto-assigned for emails in `admin_emails`.

## Auth note
New project ships with **email confirmation ON**. To let students log in immediately after sign-up, in Supabase: **Authentication → Sign In / Providers → Email → turn OFF “Confirm email”.** (We did not disable it automatically — it's a security control.)

## Files
- `index.html` · `app.js` (auth + role routing + dashboards) · `brand.css` · `config.js` (public Supabase URL + publishable key).

## Deploy
Push to `main` → GitHub Pages rebuilds. The publishable (anon) key is safe in the client; RLS protects data.

## Next phases
- Migrate the MOCKS CAMBRIDGE quiz engines natively into the portal (save attempts to `exam_attempts`).
- Secure admin "create user" via an Edge Function (service role).
