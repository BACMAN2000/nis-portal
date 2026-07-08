# Ronda A — Migración del Portal NIS a `nis.cohasset.pe`

Sacar el portal de GitHub Pages y servirlo como subdominio desde el servidor propio
de Cohasset (`204.168.174.160`, tras Cloudflare), **manteniendo el mismo stack**
(estático + Supabase). No se migra ninguna base de datos.

- **Repo (fuente):** se queda en GitHub `bacman2000/nis-portal`. El servidor lo
  **clona y hace `git pull`** — solo se apaga *GitHub Pages* (el hosting), no el repo.
- **Backend:** Supabase `kjrppibltkbflvxmiyib` no cambia. Solo se le agrega el
  origen nuevo en Auth.
- **Base:** este runbook asume la misma infra que `cohasset.pe`
  (nginx + Cloudflare + auto-pull). Llave SSH y detalles del server en
  `cohasset_s3_paolo.zip` (`HANDOFF-S3-cohasset.md`).

---

## Cambios de código ya hechos (esta ronda)

| Archivo | Cambio |
|---|---|
| `app.js` (`studentLibrary`) | El tile de Biblioteca se muestra **"Próximamente"** mientras `LIBRARY_URL` sea `127.0.0.1`/`localhost` (evita enlace roto en producción). Para activarlo: poner una URL pública en `LIBRARY_URL` (línea 15). |
| `index.html` | Cache-busting `app.js?v=106 → v=107`. |
| `deploy/` | Este runbook + `nginx-nis.cohasset.pe.conf`. |

> **Mocks (`QUIZ_URL`)**: se dejan en `bacman2000.github.io/mocks-cambridge` por ahora
> (funcionan cross-origin). Migrarlos al servidor es una tarea aparte.

**Nada más del código depende del dominio.** El resto de URLs absolutas son CDNs
(Supabase JS, Google Fonts, Tailwind, chart.js, jspdf…) que funcionan desde cualquier
dominio, y el `WRITING_WEBHOOK` es un endpoint público de Google que no cambia.

---

## Pasos de infraestructura (los ejecutas tú)

### 1. DNS en Cloudflare · cuenta `paolobaca2000@gmail.com`
En la zona `cohasset.pe` → **DNS → Add record**:

```
Type: A    Name: nis    IPv4: 204.168.174.160    Proxy: Proxied (naranja)
```

El proxy naranja da el HTTPS del borde y la caché de Cloudflare, igual que el resto de `cohasset.pe`.

### 2. Clonar el repo en el servidor y engancharlo al auto-pull
```bash
ssh -i <cohasset_s3 key> root@204.168.174.160
cd /opt
git clone https://github.com/bacman2000/nis-portal.git
# (o con la deploy-key de solo lectura, como cohasset:
#  export GIT_SSH_COMMAND="ssh -i /root/.ssh/cohasset_deploy" )
```
Añade `/opt/nis-portal` al script que ya hace el auto-pull de cohasset
(p. ej. `tools/auto_pull.sh` / cron), para que un `git push` a `main` se refleje solo.

### 3. Bloque nginx
Copia `deploy/nginx-nis.cohasset.pe.conf` (de este repo) al servidor:
```bash
cp /opt/nis-portal/deploy/nginx-nis.cohasset.pe.conf /etc/nginx/sites-available/nis.cohasset.pe
ln -s /etc/nginx/sites-available/nis.cohasset.pe /etc/nginx/sites-enabled/
nginx -t && systemctl reload nginx
```
> Recuerda: el nginx vive en el **servidor**, el `git pull` NO lo actualiza.
> Guarda un backup como haces con `cohasset` (`/root/nis.nginx.bak-*`).

### 4. Supabase — permitir el origen nuevo
Dashboard Supabase → proyecto `kjrppibltkbflvxmiyib` →
**Authentication → URL Configuration**:
- **Site URL:** `https://nis.cohasset.pe`
- **Redirect URLs:** añade `https://nis.cohasset.pe/**`

Sin esto, login / signup / reset de contraseña fallan desde el dominio nuevo.
(RLS y la anon key ya funcionan cross-origin; no hay nada más que tocar.)

### 5. Cutover — probar en vivo ANTES de apagar nada
En `https://nis.cohasset.pe`, verificar:
- [ ] Carga el portal (no queda en "Cargando…").
- [ ] Login de un **alumno**, un **profesor** y un **admin**.
- [ ] Abrir una actividad (p. ej. Crosswords) y que guarde intento.
- [ ] Anti-trampa: al cambiar de pestaña descuenta vida.
- [ ] Un reporte (My Progress / Resultado final) carga datos.
- [ ] Biblioteca muestra "Próximamente" (no un enlace roto).
- [ ] Mocks/Practice abren el motor de simulacros.
- [ ] Consola del navegador sin errores rojos.

### 6. Apagar GitHub Pages (solo cuando el paso 5 esté verde)
GitHub → repo `nis-portal` → **Settings → Pages → Source: None**.
- Si existe un archivo `CNAME` en el repo, bórralo.
- El repo puede quedar **privado/archivado** como respaldo; el server sigue
  clonando de él.
- Avisar a quien tenga el link viejo `bacman2000.github.io/nis-portal` (o dejar
  el repo público un tiempo para que el 404 no sorprenda).

---

## Qué NO se toca
- Tablas / datos de Supabase (no hay migración de datos).
- `WRITING_WEBHOOK` (Apps Script de Google, endpoint público).
- El motor anti-trampa.
- El curso de francés y los reportes (eso es de otra ronda).

## Rollback
GitHub Pages sigue vivo hasta el paso 6. Si algo falla en `nis.cohasset.pe`,
el sitio viejo `bacman2000.github.io/nis-portal` sigue operativo — no se pierde nada.
