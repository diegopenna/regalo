# Regalo editable

## Archivos

- `index.html`: estructura y textos visibles.
- `styles/estilos.css`: colores, tamaños, caja y animaciones.
- `js/regalo.js`: apertura, sonido, confeti y botón para repetir.
- `IMG/regalo.jpg`: imagen del regalo.

Abrí esta carpeta en VS Code. Para verlo, abrí `index.html` en un navegador o usá Live Server.

## Cambios habituales

1. Editá los títulos y párrafos en `index.html`.
2. Para cambiar el regalo, reemplazá `IMG/regalo.jpg`, manteniendo el nombre.
3. Si usás otro nombre o un PNG, cambiá el atributo `src` de la imagen en el HTML. Actualizá también su descripción `alt`.
4. En el JavaScript, las primeras constantes controlan la duración y cantidad de confeti.
5. En el CSS, `.gift`, `.box`, `.lid` y `.bow` definen la caja; `.reveal img` controla cómo se muestra la imagen final.

Los textos dentro de la foto forman parte de la imagen; para cambiarlos necesitás editar la foto. Los títulos y textos de la página sí son editables en el HTML.

## GitHub Pages

Subí el contenido de esta carpeta a la raíz del repositorio: `index.html` y las carpetas `styles`, `js` e `IMG`. No subas solamente el HTML ni el ZIP. Reemplazá el `index.html` anterior.

Respetá las mayúsculas: `IMG` debe coincidir con la ruta escrita en el HTML.

La página funciona sin dependencias, fuentes externas ni conexión para cargar recursos. El sonido se inicia al tocar el regalo.
