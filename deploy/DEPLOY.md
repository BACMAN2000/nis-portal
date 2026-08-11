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

> **Mocks (`QUIZ_URL`)**: el **mismo origen es el default**. `app.js` arranca en
> `/mocks-cambridge/` y solo cae a `bacman2000.github.io/mocks-cambridge` si esa
> ruta no responde (red de emergencia). El HEAD se espera en `init()` antes del
> primer render (`QUIZ_URL_READY`), así que nadie llega a ver la URL provisional.
> Si en la consola aparece el aviso `[NIS] /mocks-cambridge/ no responde…`, el
> problema está en el nginx del servidor → paso **3-bis**.

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

### 3-bis. Servir los simulacros en el mismo origen (`/mocks-cambridge/`)

Arregla dos cosas de una vez: el alumno deja de salir a `github.io` a media sesión, y
—por compartir `localStorage` con el portal— los quizzes dejan de pedirle nombre, grado
y correo a alguien que ya inició sesión (`NIS.currentStudent()` empieza a devolver
al alumno, y el auto-skip que ya existe en los quizzes por fin se dispara).

```bash
# 1) Clonar el repo de los simulacros junto al portal
cd /opt
git clone https://github.com/bacman2000/mocks-cambridge.git
#    (~60 MB de mp3; con la deploy-key igual que nis-portal si el repo es privado)

# 2) Añadir /opt/mocks-cambridge al mismo auto-pull que /opt/nis-portal

# 3) Copiar el bloque nginx ya actualizado y recargar
cp /root/nis.nginx.bak-$(date +%F) /root/ 2>/dev/null || true   # backup previo
cp /opt/nis-portal/deploy/nginx-nis.cohasset.pe.conf /etc/nginx/sites-available/nis.cohasset.pe
nginx -t && systemctl reload nginx
```

Comprobación (debe dar `200`, no `404`):

```bash
curl -s -o /dev/null -w '%{http_code}\n' https://nis.cohasset.pe/mocks-cambridge/quizzes.html
```

> **El `^~` del bloque no es opcional.** En nginx las locations *regex* se evalúan antes
> que las de prefijo: sin `^~`, la regex `\.(html|js|css)$` del propio archivo captura
> `/mocks-cambridge/quizzes.html`, lo resuelve contra `root /opt/nis-portal` y devuelve
> 404. Es un fallo que no deja rastro en los logs de error y parece "el clone salió mal".
> Por el mismo motivo el bloque lleva su propio `location ~ /\.` : `^~` desactiva la
> regla `/\.git` del server, y sin ese candado `/mocks-cambridge/.git/` quedaría expuesto.

Mientras este paso no esté hecho **no se rompe nada**: el portal detecta el 404 y sigue
usando GitHub Pages.

#### Síntoma exacto de que falta el `^~` (medido el 2026-08-11)

El clone en `/opt/mocks-cambridge` puede estar perfecto y aun así fallar. La huella es
que **solo mueren las extensiones que capturan las regex del server**:

```
/mocks-cambridge/version.json   200   <- json no está en ninguna regex -> lo sirve el prefijo
/mocks-cambridge/README.md      200
/mocks-cambridge/quizzes.html   404   <- capturado por  \.(html|js|css)$
/mocks-cambridge/nis-bridge.js  404
/mocks-cambridge/favicon.svg    404   <- capturado por la regex de media
/mocks-cambridge/              200 pero devuelve el index.html DEL PORTAL (fallback SPA)
```

Si ves ese patrón, el clone está bien y lo único que falta es recargar nginx con el
bloque de este repo (el que ya lleva `^~`):

```bash
cp /etc/nginx/sites-available/nis.cohasset.pe /root/nis.nginx.bak-$(date +%F)
cp /opt/nis-portal/deploy/nginx-nis.cohasset.pe.conf /etc/nginx/sites-available/nis.cohasset.pe
nginx -t && systemctl reload nginx
curl -s -o /dev/null -w '%{http_code}\n' https://nis.cohasset.pe/mocks-cambridge/quizzes.html   # 200
```

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
