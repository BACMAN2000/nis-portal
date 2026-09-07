# Adelgazar el repositorio del portal

Medido el **6-sep-2026**. No ejecutar el paso 3 sin leer entero el apartado
«Lo que rompe».

## El diagnóstico, con números

`.git` pesa **2.598 MB** repartidos en 30.663 objetos. Lo que ocupa:

| qué es | en el historial |
|---|---|
| audio de los readers (`*-audio/`) | 796 MB |
| material de Fun for Nordic ya sacado del repo | 684 MB |
| audio y láminas de YLE | 362 MB |
| audio de nis-fun | 270 MB |
| audio de los mocks | 257 MB |
| láminas y fotos de nis-fun | 124 MB |
| **todo el código: HTML, JS, JSON, CSS** | **105 MB** |

**El código es el 4 % del repositorio.** El resto es material que se sube entero
cada vez que se regenera, y del que git guarda todas las versiones para siempre.

El culpable principal **no son los PDF** (221 MB): es el **audio**, 1.685 MB
entre los cuatro grupos, dos tercios del total.

## Paso 1 — hecho el 6-sep-2026

Salieron del repositorio 2.028 archivos y 736 MB del checkout:
`nis-fun/assets/videos/`, `nis-fun/book-builder/` y `nis-fun/build-videos/`.
Viven en **`/opt/nis-media/`** (ver su `LEEME.txt`). Los vídeos los sirve nginx
en la ruta de siempre con `location ^~ /nis-fun/assets/videos/`, así que ninguna
página cambió. Los PDF y el taller de vídeo no los pedía nadie.

Esto **frena el crecimiento**; no reduce el `.git`, que sigue guardando todas las
versiones anteriores.

## Paso 2 — hecho el 6-sep-2026

Salió también el audio: **15.984 archivos y 1.777 MB**. Las ocho carpetas
(`treasureisland-audio`, `princepauper-audio`, `attwn-audio`, `earnest-audio`,
`tomsawyer-audio`, `cambridge-audio`, `nis-fun/audio`, `mocks-cambridge/mp3`)
viven en `/opt/nis-media/` y las sirve nginx **en las mismas rutas de siempre**,
cada una con su `location ^~`. Ninguna página cambió una línea.

`yle-audio/` e `yle-img/` salieron también, pero **sin `location`**: ese material
lo entrega el backend con permiso desde `/opt/yle-media`, y sus rutas públicas
siguen devolviendo 404 a propósito.

**Resultado: el checkout pasó de 3,4 GB a 246 MB.** Los archivos rastreados
bajaron de ~19.400 a 3.392.

El procedimiento, por si hay que repetirlo con otra carpeta:

1. copiar la carpeta a `/opt/nis-media/<lo-que-sea>/` **en el servidor**, que ya
   la tiene desplegada (no hace falta subir nada);
2. `location ^~ /<ruta-web>/ { alias /opt/nis-media/...; }` en nginx —
   **el `^~` es imprescindible**, o la regex de extensiones se evalúa antes y
   devuelve 404;
3. comprobar, **apartando un archivo del repo**, que se sigue sirviendo: es la
   única prueba que distingue «funciona» de «todavía lo sirve el repo»;
4. `.gitignore` + `git rm -r --cached` + push;
5. volver a comprobar tras el autopull, y abrir una página que lo use.

`/opt/yle-media-sync.sh` se actualizó: ya no tiene nada que copiar en un
despliegue normal y **avisa en el log** en vez de callar, porque el material
nuevo hay que subirlo a mano.

## Paso 3 — reescribir el historial (NO ejecutar sin avisar)

Deja el `.git` en unos **105 MB** (de 2.598). Herramienta: `git-filter-repo`
(**no está instalada**: `pip install git-filter-repo`; tampoco hay Java para BFG).

    git clone --mirror https://github.com/bacman2000/nis-portal.git nis-portal-mirror
    cd nis-portal-mirror
    git filter-repo --invert-paths \
      --path-glob 'nis-fun/assets/videos/*' \
      --path-glob 'nis-fun/book-builder/*' \
      --path-glob 'nis-fun/build-videos/*' \
      --path-glob '*-audio/*' \
      --path-glob 'yle-audio/*' --path-glob 'yle-img/*' \
      --path-glob 'nis-fun/audio/*' \
      --path-glob 'mocks-cambridge/*.mp3' --path-glob 'cambridge-audio/*'
    git push --force --mirror

Antes de empujar: comparar `git count-objects -vH` del espejo con el original y
comprobar que el árbol del último commit conserva todo el código
(`git ls-files | wc -l` y un `diff` de la lista contra el repo actual).

### Lo que rompe

- **Todas las máquinas y sesiones deben volver a clonar.** Los commits cambian de
  identificador: quien tenga el repo viejo no puede ni empujar ni traer.
  Hoy mismo hay al menos un worktree de otra sesión abierto
  (`git worktree list` lo dice) y la Lenovo publica en el repo espejo.
- **El servidor también.** `nis-portal-autopull.sh` hace `git reset --hard
  origin/main` y fallará con el historial divergente: hay que **borrar
  `/opt/nis-portal` y clonar de nuevo**, y comprobar después que la web responde.
- **El paso 2 ya está hecho**, así que la reescritura no dejaría ninguna página
  sin sonido: el material vive fuera del repositorio y lo sirve nginx.
- El material sacado deja de estar recuperable desde git: por eso está copiado en
  `/opt/nis-media/`, y conviene una copia más fuera del servidor.

### Cuándo

Cuando no haya nadie más publicando y con el usuario avisado. Es su decisión.
