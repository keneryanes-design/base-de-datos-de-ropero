ESPECTROTECA IR — VERSIÓN INTEGRADA

Contenido:
- index.html, styles.css y app.js: interfaz, estilos y funciones de la aplicación.
- data/compuestos.json: 200 fichas relacionadas con las imágenes recibidas.
- spectra/: 200 imágenes de espectros organizadas por grupo funcional.
- manifest.json, service-worker.js, offline.html e icons/: recursos PWA y uso sin conexión.

Grupos incluidos:
Ácidos carboxílicos, Alcanos, Alcoholes, Aldehídos, Alquenos, Alquinos, Aminas, Anhídridos, Cetonas y Haluros de ácido.

Notas:
- Las bandas listadas son orientativas por grupo funcional; no son lecturas automáticas de los picos de cada imagen.
- La procedencia y condiciones experimentales de las imágenes deben verificarse en sus fuentes originales.
- Consulta INFORME_DEPURACION.csv que se entrega por separado para revisar discrepancias detectadas en el CSV de origen.

Publicación en GitHub Pages:
Settings > Pages > Deploy from a branch > main > /(root).
Después, en Actions, comprueba que la ejecución de pages build and deployment finalice correctamente.


Funciones de esta versión:
- Selector manual de tema claro/oscuro con preferencia guardada.
- Búsqueda visual aproximada por imagen entre los espectros incluidos.
- Procedencia disponible dentro de la ficha del compuesto, no en la tarjeta del catálogo.
