ESPECTROTECA IR — PWA

Esta versión incorpora la base para instalar la web y guardar sus archivos básicos para usarlos sin conexión.

Archivos añadidos:
- manifest.json: nombre, iconos y configuración instalable.
- service-worker.js: precarga los archivos básicos y guarda recursos locales que se visiten.
- offline.html: página de respaldo.
- icons/: iconos de la aplicación.
También se añadió un indicador de conexión en la interfaz.

PUBLICACIÓN EN GITHUB PAGES
1. Descomprime el ZIP.
2. En GitHub crea un repositorio público, por ejemplo: espectroteca-ir.
3. Sube el CONTENIDO de la carpeta espectroteca_work a la raíz del repositorio. index.html debe quedar en la raíz publicada.
4. En Settings > Pages, elige Deploy from a branch, rama main y carpeta /(root), y guarda.
5. Espera la publicación y abre la URL que GitHub Pages muestra.
6. Prueba la URL HTTPS en el móvil. En iPhone/iPad abre en Safari y usa Compartir > Añadir a pantalla de inicio; en Android usa el menú del navegador > Instalar/Añadir a pantalla de inicio.

MODO SIN CONEXIÓN — LIMITACIONES IMPORTANTES
- Abre la web al menos una vez con internet para que se instalen el service worker y los archivos básicos.
- El catálogo JSON actual tiene 200 registros y se precarga para que la búsqueda y las fichas sigan funcionando sin conexión.
- Aún NO hay 200 espectros experimentales originales incorporados. Las fichas actuales señalan que están pendientes de localizar/verificar.
- Cuando se agreguen espectros como archivos locales (por ejemplo, data/spectra/...), hay que añadir sus rutas a CORE_ASSETS en service-worker.js o abrirlos en línea una vez para que el caché dinámico los guarde. Para garantizar que los 200 estén disponibles offline desde el primer uso, se deben precargar todos los archivos de espectros autorizados en CORE_ASSETS. Tener enlaces a NIST/SDBS no hace que sus páginas externas funcionen offline.
- El service worker solo almacena archivos del mismo origen; no descarga automáticamente recursos de otros dominios.
- Cada vez que se actualice la lista de archivos precargados, cambia CACHE_NAME (por ejemplo, v1 a v2) para forzar una nueva caché.
- El modo offline debe probarse después de la publicación: abre la página, espera que termine de cargar, activa modo avión y recarga.

DESARROLLO LOCAL
Usa VS Code + Live Server. Los service workers requieren localhost o HTTPS; no funcionan correctamente abriendo index.html con file://.

CIENCIA Y LICENCIAS
Los registros actuales contienen bandas orientativas y enlaces de consulta; no deben presentarse como espectros experimentales. Antes de redistribuir espectros de terceros, verifica las condiciones de uso de cada fuente.
