/**
 * ============================================================
 *  BLOG — English Pro Academy
 * ============================================================
 *  Fuente de contenido del blog (capa de presentación).
 *
 *  ➜ Hoy las entradas viven en este archivo (estáticas).
 *  ➜ Cuando conectemos el panel de admin (PHP + MySQL en cPanel),
 *    esta misma forma de datos se llenará desde la API, así que
 *    las páginas del blog NO tendrán que cambiar.
 *
 *  Cada entrada (post):
 *    slug      → identificador en la URL (#/blog/mi-slug). Único, sin espacios.
 *    title     → título de la entrada
 *    excerpt   → resumen corto para las tarjetas y el SEO
 *    category  → categoría (se usa también para filtrar)
 *    author    → { name, role }
 *    date      → fecha ISO 'YYYY-MM-DD'
 *    readMins  → minutos de lectura aprox.
 *    cover     → degradado de portada [colorInicio, colorFin] (placeholder)
 *    featured  → true para destacarla arriba del listado
 *    content   → bloques: { type: 'p' | 'h2' | 'quote' | 'ul', text | items }
 * ============================================================
 */

export const blogCategories = [
  'Todos',
  'Aprendizaje',
  'Certificaciones',
  'Business English',
  'Consejos',
]

export const posts = [
  {
    slug: 'habitos-diarios-para-mejorar-tu-ingles',
    title: '5 hábitos diarios para mejorar tu inglés sin darte cuenta',
    excerpt:
      'Pequeñas acciones que, repetidas cada día, hacen una diferencia enorme en tu fluidez. Ninguna te toma más de 10 minutos.',
    category: 'Consejos',
    author: { name: 'Equipo English Pro', role: 'English Teachers' },
    date: '2026-05-28',
    readMins: 5,
    cover: ['#004088', '#003066'],
    featured: true,
    content: [
      {
        type: 'p',
        text: 'Aprender inglés no se trata solo de las horas de clase: lo que haces el resto del día es lo que realmente acelera tu progreso. La buena noticia es que no necesitas grandes sacrificios, sino constancia en pequeños hábitos.',
      },
      { type: 'h2', text: '1. Cambia el idioma de tu teléfono' },
      {
        type: 'p',
        text: 'Es el truco más simple y efectivo. Tu cerebro empieza a asociar palabras en inglés con acciones que ya conoces de memoria, sin esfuerzo consciente.',
      },
      { type: 'h2', text: '2. Escucha 10 minutos de un podcast' },
      {
        type: 'p',
        text: 'Mientras te preparas en la mañana o vas al trabajo, deja que tu oído se acostumbre a los sonidos reales del idioma. No tienes que entenderlo todo: la exposición constante es la clave.',
      },
      { type: 'h2', text: '3. Aprende frases, no palabras sueltas' },
      {
        type: 'p',
        text: 'Memorizar listas de vocabulario aislado rara vez funciona. En cambio, aprender expresiones completas te da bloques listos para usar en una conversación real.',
      },
      {
        type: 'quote',
        text: 'La fluidez no es saber muchas palabras, es poder usar las que ya conoces sin pensarlo.',
      },
      { type: 'h2', text: '4. Habla contigo mismo' },
      {
        type: 'p',
        text: 'Describe en voz alta lo que estás haciendo. Suena extraño, pero entrena tu producción oral y reduce el miedo a equivocarte cuando hables con otra persona.',
      },
      { type: 'h2', text: '5. Repasa antes de dormir' },
      {
        type: 'p',
        text: 'Dedicar cinco minutos a repasar lo aprendido durante el día ayuda a fijar la información en la memoria a largo plazo.',
      },
      {
        type: 'p',
        text: 'En English Pro reforzamos estos hábitos en cada clase en vivo, con un plan a tu medida. ¿Quieres que diseñemos el tuyo? Toma tu clase de prueba gratis.',
      },
    ],
  },
  {
    slug: 'toefl-o-ielts-cual-elegir',
    title: '¿TOEFL o IELTS? Cómo elegir la certificación correcta para ti',
    excerpt:
      'Ambas son válidas y reconocidas, pero no son iguales. Te explicamos las diferencias para que elijas según tu objetivo.',
    category: 'Certificaciones',
    author: { name: 'Equipo English Pro', role: 'Exam Prep Specialists' },
    date: '2026-05-15',
    readMins: 6,
    cover: ['#D81C2B', '#94101C'],
    featured: false,
    content: [
      {
        type: 'p',
        text: 'Cuando decides certificar tu nivel de inglés, la primera pregunta suele ser la misma: ¿TOEFL o IELTS? Ambas certificaciones tienen validez internacional, pero están pensadas para perfiles y objetivos distintos.',
      },
      { type: 'h2', text: 'TOEFL: ideal para el ámbito académico en EE. UU.' },
      {
        type: 'p',
        text: 'El TOEFL es 100% por computador y tiene un enfoque académico. Es la opción preferida por universidades de Estados Unidos y Canadá.',
      },
      { type: 'h2', text: 'IELTS: flexible y muy usado en Europa y Oceanía' },
      {
        type: 'p',
        text: 'El IELTS ofrece una versión académica y una general (para migración o trabajo). Su sección oral es una entrevista cara a cara con un examinador real.',
      },
      { type: 'h2', text: '¿Cómo decidir?' },
      {
        type: 'ul',
        items: [
          'Si vas a estudiar en EE. UU., el TOEFL suele ser la apuesta segura.',
          'Si migras a Canadá, Australia o Reino Unido, revisa cuál exige tu trámite.',
          'Si te sientes cómodo hablando con una persona, el IELTS puede favorecerte.',
          'Si prefieres todo en computador, el TOEFL encaja mejor.',
        ],
      },
      {
        type: 'quote',
        text: 'No existe la certificación "mejor": existe la que mejor se ajusta a tu meta.',
      },
      {
        type: 'p',
        text: 'En nuestro programa de Preparación para exámenes hacemos un diagnóstico, definimos tu objetivo y te entrenamos con simulacros reales hasta que llegas listo al examen.',
      },
    ],
  },
  {
    slug: 'clases-en-vivo-vs-videos-pregrabados',
    title: 'Por qué las clases en vivo superan a los videos pregrabados',
    excerpt:
      'Los cursos grabados prometen flexibilidad, pero hay una razón por la que la mayoría no llega al final. Hablemos de eso.',
    category: 'Aprendizaje',
    author: { name: 'Equipo English Pro', role: 'English Teachers' },
    date: '2026-04-30',
    readMins: 4,
    cover: ['#1A2332', '#004088'],
    featured: false,
    content: [
      {
        type: 'p',
        text: 'Un video pregrabado no te corrige cuando pronuncias mal, no responde tus dudas y no nota cuándo te perdiste. La interacción real es justo lo que convierte el estudio en aprendizaje.',
      },
      { type: 'h2', text: 'La práctica oral necesita un interlocutor' },
      {
        type: 'p',
        text: 'Hablar es una habilidad que solo se desarrolla hablando con alguien que te escuche y te responda. Una pantalla que reproduce un video no puede darte eso.',
      },
      { type: 'h2', text: 'La retroalimentación inmediata acelera todo' },
      {
        type: 'p',
        text: 'Cuando un docente corrige tu error en el momento, tu cerebro lo fija mucho mejor que si descubres semanas después que lo venías diciendo mal.',
      },
      {
        type: 'quote',
        text: 'En una clase en vivo no eres espectador: eres protagonista.',
      },
      {
        type: 'p',
        text: 'Por eso en English Pro todas nuestras clases son sincrónicas, en vivo y en grupos reducidos. Nada de videos pregrabados.',
      },
    ],
  },
  {
    slug: 'frases-clave-para-tu-proxima-reunion-en-ingles',
    title: 'Business English: frases clave para tu próxima reunión',
    excerpt:
      'Llega seguro a tu siguiente meeting con expresiones profesionales que suenan naturales y te hacen ver preparado.',
    category: 'Business English',
    author: { name: 'Equipo English Pro', role: 'Business English Coaches' },
    date: '2026-04-18',
    readMins: 5,
    cover: ['#003066', '#001C3D'],
    featured: false,
    content: [
      {
        type: 'p',
        text: 'Participar en una reunión en inglés puede ponerte nervioso, pero con unas cuantas frases bien escogidas proyectas seguridad y profesionalismo desde el primer minuto.',
      },
      { type: 'h2', text: 'Para abrir la reunión' },
      {
        type: 'ul',
        items: [
          '“Thanks everyone for joining today.” — Gracias a todos por acompañarnos hoy.',
          '“Let’s get started, shall we?” — Empecemos, ¿les parece?',
          '“The main goal of this meeting is…” — El objetivo principal de esta reunión es…',
        ],
      },
      { type: 'h2', text: 'Para dar tu opinión' },
      {
        type: 'ul',
        items: [
          '“From my perspective…” — Desde mi punto de vista…',
          '“I’d like to add that…” — Me gustaría añadir que…',
          '“That’s a good point, however…” — Es un buen punto, sin embargo…',
        ],
      },
      { type: 'h2', text: 'Para cerrar' },
      {
        type: 'ul',
        items: [
          '“Let’s circle back on this next week.” — Retomemos esto la próxima semana.',
          '“To sum up…” — Para resumir…',
          '“Thanks for your time, everyone.” — Gracias por su tiempo a todos.',
        ],
      },
      {
        type: 'quote',
        text: 'No necesitas un vocabulario gigante para sonar profesional: necesitas las frases correctas en el momento correcto.',
      },
      {
        type: 'p',
        text: 'En nuestro programa de Business English entrenamos justamente este tipo de situaciones reales, adaptadas a tu sector.',
      },
    ],
  },
]

// --- Helpers ---------------------------------------------------------------

export const getPostBySlug = (slug) => posts.find((p) => p.slug === slug)

export const getFeaturedPost = () => posts.find((p) => p.featured) || posts[0]

export const getRelatedPosts = (slug, limit = 2) =>
  posts.filter((p) => p.slug !== slug).slice(0, limit)

export const formatDate = (iso) =>
  new Date(iso + 'T00:00:00').toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
