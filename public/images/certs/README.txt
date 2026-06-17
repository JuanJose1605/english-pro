LOGOS DE CERTIFICACIONES
========================

Coloca aquí los logotipos oficiales de cada certificación, con estos nombres
exactos (formato PNG con fondo transparente, recomendado ~240px de alto):

  toefl.png
  ielts.png
  cambridge.png
  toeic.png
  efset.png

Las rutas están configuradas en: src/data/site.js  (export const certifications)

Mientras un archivo no exista, la web muestra automáticamente el nombre de la
certificación estilizado como respaldo, así que el diseño nunca se rompe.

Si agregas, quitas o renombras certificaciones, edita el arreglo `certifications`
en src/data/site.js (campos: name, note, logo).
