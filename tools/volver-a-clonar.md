# Después de limpiar el historial: qué hace cada máquina

Cuando se ejecute la limpieza (`tools/limpieza-historial.md`, paso 3), el
repositorio del portal cambia de identificadores: **los commits viejos dejan de
existir**. Nadie pierde archivos, pero cada copia hay que rehacerla.

Léelo entero antes de empezar. Son diez minutos.

## 1. Antes de nada, en cada máquina: guarda lo que no hayas publicado

En la carpeta del portal:

    git status

Si aparece cualquier cosa en rojo o en verde, guárdalo antes de seguir:

    git stash push -u -m "antes de la limpieza"

Y si tienes commits propios sin subir (`git log origin/main..HEAD` muestra
algo), sácalos a un archivo:

    git format-patch origin/main -o ../mis-cambios-portal

Esos parches se vuelven a aplicar luego con `git am ../mis-cambios-portal/*.patch`.

## 2. El servidor (lo hace quien tenga acceso; **primero esto, antes que nada**)

La web se sirve desde `/opt/nis-portal`. Se sustituye por un clon nuevo, dejando
el viejo al lado hasta comprobar que todo va bien:

    systemctl stop cron                       # que el autopull no moleste
    mv /opt/nis-portal /opt/nis-portal.viejo
    git clone https://github.com/BACMAN2000/nis-portal.git /opt/nis-portal
    systemctl start cron

Comprobar **antes de borrar nada**: la portada, el portal, el lector, el curso y
los simulacros responden, y suena un audio de cada sitio. Si algo falla, se
vuelve atrás con `mv /opt/nis-portal.viejo /opt/nis-portal`.

Cuando lleve un par de días bien: `rm -rf /opt/nis-portal.viejo`.

**El material no se toca.** Vive en `/opt/nis-media` y `/opt/yle-media`, fuera
del repositorio, y el clon nuevo no lo afecta.

## 3. Cada PC (la de escritorio, la Lenovo)

Lo más simple y seguro es clonar de cero al lado y borrar la carpeta vieja
después de comprobar:

    cd C:\Projects
    git clone https://github.com/BACMAN2000/nis-portal.git nis-portal-nuevo

Luego copiar a mano lo que no está en git y quieras conservar (el audio y los
vídeos locales, si los tenías), renombrar la carpeta vieja y poner la nueva en su
sitio.

Si prefieres reaprovechar la carpeta que ya tienes:

    git fetch origin
    git reset --hard origin/main
    git reflog expire --expire=now --all && git gc --prune=now --aggressive

## 4. Las sesiones de Claude que estén trabajando en el portal

Cada una debe **terminar y publicar lo suyo antes de la ventana**. Las que usen
un *worktree* (`.claude/worktrees/...`) tienen que publicar su rama o guardar
parches: esas ramas no están en el servidor de GitHub y, tras la limpieza,
quedan colgando de commits que ya no existen.

## 5. Comprobación final, en este orden

1. `git log --oneline -3` en el servidor: debe mostrar los commits nuevos.
2. La web: portada, portal, lector, curso, simulacros.
3. Un audio de cada sitio (lector, curso, simulacros) y una lámina de los
   exámenes de niños, que pide cuenta.
4. `du -sh /opt/nis-portal/.git`: debe rondar los **325 MB**, no los 2,5 GB.
