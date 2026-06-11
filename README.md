# English Pro Academy — Landing Page

Single-page landing (SPA) para **English Pro Academy**, construida con **React + Vite + Tailwind CSS** y **Framer Motion**. Optimizada para conversión, mobile-first, y lista para hosting **cPanel**.

> *Easy to teach, easy to learn — Tu nivel de inglés, ahora con sello Pro.*

---

## 🚀 Desarrollo

```bash
npm install      # instala dependencias
npm run dev      # servidor de desarrollo (http://localhost:5173)
npm run build    # genera la carpeta dist/ para producción
npm run preview  # previsualiza el build de producción
```

## 📦 Despliegue en cPanel

1. Ejecuta `npm run build`. Se genera la carpeta **`dist/`**.
2. Entra a **cPanel → Administrador de archivos → `public_html`**
   (o la subcarpeta del dominio/subdominio).
3. Sube **todo el contenido de `dist/`** (no la carpeta, sino lo que hay dentro):
   `index.html`, `assets/`, `logo.png`, `.htaccess`, `robots.txt`, `sitemap.xml`, `images/`.
   - Asegúrate de mostrar archivos ocultos para subir **`.htaccess`**.
4. El `.htaccess` ya incluye: redirección a HTTPS, fallback SPA, gzip, caché y headers de seguridad.

> El `vite.config.js` usa `base: './'` (rutas relativas), por lo que funciona tanto en la raíz del dominio como en una subcarpeta.

---

## ✏️ Datos por reemplazar (marcadores `⚠️ PLACEHOLDER`)

Todo el contenido editable vive en **`src/data/site.js`** y **`src/data/quiz.js`**.

| Qué | Dónde |
|-----|-------|
| **Número de WhatsApp** | `WHATSAPP_NUMBER` en `src/data/site.js` (formato internacional sin `+`, ej. `573001234567`) |
| **Email / teléfono / horario / redes** | objeto `contact` en `src/data/site.js` |
| **Certificaciones (logos)** | array `certifications` + componentes `TrustBar.jsx` / `Certificaciones.jsx` |
| **Misión / Visión** | objeto `nosotros` en `src/data/site.js` |
| **Docentes (nombre, rol, bio, foto)** | array `teachers` + `Docentes.jsx` |
| **Testimonios reales** | array `testimonials` + `Testimonios.jsx` |
| **Fotos reales de clases** | `src/components/sections/Galeria.jsx` y la imagen del Hero |
| **Dominio real (SEO)** | `index.html` (canonical, OG, JSON-LD), `robots.txt`, `sitemap.xml` |

### Reemplazar imágenes
Coloca las fotos reales en `public/images/` y referencia con `./images/archivo.webp`
(usa **WebP** y define `width`/`height` para no afectar el rendimiento).

---

## 🎨 Identidad de marca

| Color | Hex | Uso |
|-------|-----|-----|
| Pro Blue | `#004088` | Primario / confianza / navegación |
| Pro Red | `#D81C2B` | Solo CTAs y acentos clave |
| Academy Gray | `#666666` | Texto secundario |

**Tipografías:** Poppins (títulos) + Inter (texto).

## 🧩 Estructura

```
src/
  data/            site.js (contenido) · quiz.js (test de nivel)
  hooks/           useActiveSection.js
  lib/             scroll.js
  components/
    Navbar.jsx · FloatingButtons.jsx · LevelTest.jsx
    ui/            Section · Reveal · Counter · Icon
    sections/      Hero · TrustBar · Nosotros · PorQue · Programas ·
                   Metodologia · Niveles · Certificaciones · Docentes ·
                   Galeria · Testimonios · Cotiza · FAQ · Contacto · Footer
  App.jsx · main.jsx · index.css
```

## ♿ Calidad
- Mobile-first, responsive (375 / 768 / 1024 / 1440).
- WCAG AA: contraste, focus visible, navegación por teclado, `aria-*`.
- `prefers-reduced-motion` respetado globalmente.
- SEO: meta tags, Open Graph, Twitter Card, JSON-LD (EducationalOrganization + Course + FAQPage), `lang="es"`.
