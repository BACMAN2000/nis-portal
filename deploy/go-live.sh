#!/usr/bin/env bash
# ============================================================================
# nis.cohasset.pe — arranque en el servidor (ejecutar como root, una sola vez;
# es idempotente: puedes re-correrlo sin romper nada).
#
#   ssh -i <cohasset_s3 key> root@204.168.174.160
#   curl -fsSL https://raw.githubusercontent.com/BACMAN2000/nis-portal/main/deploy/go-live.sh | bash
#   # (o, si ya clonaste el repo:  bash /opt/nis-portal/deploy/go-live.sh )
#
# Hace: (1) clona/actualiza el repo en /opt/nis-portal  (2) instala el bloque
# nginx del subdominio  (3) valida y recarga nginx. NO toca DNS, Supabase ni
# GitHub Pages (eso son 3 acciones de dashboard; ver el eco final).
# ============================================================================
set -euo pipefail

REPO="https://github.com/BACMAN2000/nis-portal.git"
DIR="/opt/nis-portal"
SITE="nis.cohasset.pe"
AVAIL="/etc/nginx/sites-available/$SITE"
ENABL="/etc/nginx/sites-enabled/$SITE"

echo "→ [1/3] Código en $DIR"
if [ -d "$DIR/.git" ]; then
  git -C "$DIR" pull --ff-only
else
  git clone "$REPO" "$DIR"
fi

echo "→ [2/3] nginx site $SITE"
cp "$DIR/deploy/nginx-nis.cohasset.pe.conf" "$AVAIL"
ln -sfn "$AVAIL" "$ENABL"

echo "→ [3/3] Validar y recargar nginx"
nginx -t
systemctl reload nginx

echo
echo "✅ Frontend listo: $SITE se sirve desde $DIR (puerto 80 origen)."
echo
echo "FALTAN 3 acciones de dashboard (no automatizables desde aquí):"
echo "  1. Cloudflare (zona cohasset.pe) → DNS → A  nis → 204.168.174.160  (Proxied)."
echo "     · TLS: si la zona usa 'Full', wirea el 443 en el .conf reusando el"
echo "       Origin Cert *.cohasset.pe existente; si usas 'Flexible', el :80 basta."
echo "  2. Supabase (proyecto kjrppibltkbflvxmiyib) → Authentication → URL Config:"
echo "     Site URL = https://nis.cohasset.pe  ·  Redirect += https://nis.cohasset.pe/**"
echo "  3. Cuando verifiques en vivo: GitHub repo → Settings → Pages → Source: None."
echo
echo "Auto-deploy futuro: añade $DIR a tu tools/auto_pull.sh (como cohasset.pe)."
