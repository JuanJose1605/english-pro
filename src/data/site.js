/**
 * ============================================================
 *  CONTENIDO Y CONFIGURACIÓN — English Pro Academy
 * ============================================================
 *  Fuente de verdad en español. Reemplaza los marcadores
 *  ⚠️ PLACEHOLDER por los datos reales del cliente.
 * ============================================================
 */

// ⚠️ PLACEHOLDER — número de WhatsApp en formato internacional sin "+", espacios ni guiones.
export const WHATSAPP_NUMBER = '573000000000'
export const WHATSAPP_MESSAGE = 'Hola English Pro 👋, quiero información sobre los cursos de inglés.'
export const whatsappUrl = (msg = WHATSAPP_MESSAGE) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`

export const contact = {
  email: 'info@englishpro.example', // ⚠️ PLACEHOLDER
  phone: '+57 300 000 0000', // ⚠️ PLACEHOLDER
  schedule: 'Lun – Sáb · 7:00 a.m. – 8:00 p.m.',
  socials: [
    { name: 'Instagram', url: '#' }, // ⚠️ PLACEHOLDER
    { name: 'Facebook', url: '#' }, // ⚠️ PLACEHOLDER
    { name: 'LinkedIn', url: '#' }, // ⚠️ PLACEHOLDER
    { name: 'TikTok', url: '#' }, // ⚠️ PLACEHOLDER
  ],
}

export const navLinks = [
  { id: 'inicio', label: 'Inicio' },
  { id: 'nosotros', label: 'Nosotros' },
  {
    id: 'programas',
    label: 'Programas',
    children: [{ id: 'metodologia', label: 'Metodología' }],
  },
  { id: 'certificaciones', label: 'Certificaciones' },
  { id: 'contacto', label: 'Contacto' },
]

export const hero = {
  eyebrow: 'Academia de inglés 100% virtual',
  title: 'Domina el inglés que el mundo real necesita.',
  subtitle:
    'Clases virtuales en grupos pequeños, planes personalizados y certificaciones oficiales para impulsar tu futuro.',
  taglineEn: 'Easy to teach, easy to learn',
  taglineEs: 'Tu nivel de inglés, ahora con sello Pro.',
  stats: [
    { value: 1200, suffix: '+', label: 'Estudiantes formados' },
    { value: 98, suffix: '%', label: 'Satisfacción' },
    { value: 10, suffix: '', label: 'Máx. por grupo' },
    { value: 6, suffix: '', label: 'Niveles (A1–C2)' },
  ],
}

// Logos de certificaciones. Coloca los archivos reales en `public/images/certs/`.
// Si el archivo no existe, se muestra el nombre estilizado como respaldo.
// (⚠️ PLACEHOLDER: confirmar cuáles ofrece la academia)
export const certifications = [
  { name: 'IELTS', note: 'British Council', logo: './images/certs/ielts.png' },
  { name: 'Cambridge', note: 'B2 First · C1 Advanced', logo: './images/certs/cambridge.png' },
  { name: 'TOEIC', note: 'Entorno profesional', logo: './images/certs/toeic.png' },
]

export const nosotros = {
  eyebrow: 'Quiénes somos',
  title: 'Aprender inglés es un proyecto personal, y nosotros lo hacemos real.',
  paragraphs: [
    'English Pro es una academia de idiomas innovadora, creada para lograr resultados efectivos en el aprendizaje de idiomas.',
    'Utilizamos herramientas de enseñanza y aprendizaje de última generación. Nuestra metodología y estrategias guían al estudiante por un proceso de adquisición del idioma dinámico, efectivo y divertido.',
    'Entendemos que cada estudiante tiene metas distintas: desde quien necesita el idioma para su carrera profesional, hasta quien desea viajar o cumplir un reto personal. Por eso nos especializamos en crear planes de estudio a la medida.',
  ],
  // ⚠️ PLACEHOLDER — texto oficial de misión y visión
  mission:
    'Guiar a cada estudiante hacia la fluidez real del inglés con una metodología comunicativa, docentes certificados y un acompañamiento cercano que convierte el aprendizaje en una experiencia efectiva y divertida.',
  vision:
    'Ser la academia virtual de inglés de referencia en la región, reconocida por la calidad de sus clases en vivo y por el número de estudiantes que logran su certificación oficial.',
}

export const whyUs = [
  {
    icon: 'ClipboardList',
    title: 'Plan a tu medida',
    desc: 'Creamos un plan de estudio acorde a tu necesidad, tus metas y tu ritmo.',
  },
  {
    icon: 'GraduationCap',
    title: 'Docentes certificados',
    desc: 'Contamos con docentes especializados y certificados en la enseñanza del inglés.',
  },
  {
    icon: 'MessagesSquare',
    title: 'Metodología blended comunicativa',
    desc: 'Aprendizaje centrado en la comunicación real, no en la memorización.',
  },
  {
    icon: 'BadgeCheck',
    title: 'Te certificamos',
    desc: 'Te preparamos para certificar tu nivel de inglés ante el mundo.',
  },
  {
    icon: 'Video',
    title: 'Clases sincrónicas en vivo',
    desc: 'Clases interactivas en las que disfrutas mientras aprendes. Nada de videos pregrabados.',
  },
]

export const programs = [
  {
    id: 'personalizados',
    icon: 'User',
    name: 'Personalizados',
    tag: '1 a 1',
    desc: 'Aprende a tu ritmo con clases virtuales 1 a 1 en vivo. Diseñamos un plan exclusivo según tus necesidades, priorizando la comunicación real y la fluidez. ¡Nos adaptamos a tus horarios y espacios para que estudiar nunca sea un problema!',
    features: ['Plan 100% exclusivo', 'Horarios flexibles', 'Enfoque en fluidez real'],
  },
  {
    id: 'grupales',
    icon: 'Users',
    name: 'Grupales',
    tag: '5 a 10 estudiantes',
    desc: 'Aprende en equipo con grupos reducidos de máximo 10 estudiantes. Disfruta de clases virtuales en vivo 100% dinámicas, donde la interacción y la práctica real son las protagonistas. ¡Diviértete en cada sesión y domina un nuevo idioma casi sin darte cuenta!',
    features: ['Grupos de máx. 10', 'Clases dinámicas en vivo', 'Práctica e interacción constante'],
  },
  {
    id: 'business',
    icon: 'Briefcase',
    name: 'Business English',
    tag: 'Para empresas',
    desc: 'Impulsa el talento de tu organización con programas diseñados a la medida de tu sector. Ofrecemos capacitación lingüística virtual (grupal o personalizada) con un enfoque 100% práctico y de negocios, potenciando la comunicación asertiva en entornos administrativos y comerciales.',
    features: ['A la medida del sector', 'Enfoque práctico y de negocios', 'Grupal o personalizado'],
  },
  {
    id: 'examenes',
    icon: 'Award',
    name: 'Preparación para exámenes',
    tag: 'Certificación oficial',
    desc: 'Logra la certificación oficial que tu perfil necesita. Te brindamos las herramientas clave, simulacros y un acompañamiento estratégico personalizado (individual o para equipos) para asegurar tu éxito en el examen internacional de tu elección.',
    features: ['Simulacros reales', 'Acompañamiento estratégico', 'Individual o en equipo'],
  },
]

export const methodology = {
  eyebrow: 'Metodología',
  title: 'Tecnología de punta con calidez humana.',
  subtitle:
    'Olvídate de los videos pregrabados. Aprende en vivo con docentes expertos y una plataforma interactiva de última generación.',
  steps: [
    { icon: 'Search', title: 'Diagnóstico', desc: 'Evaluamos tu nivel actual y definimos tus metas reales.' },
    { icon: 'Route', title: 'Plan a tu medida', desc: 'Diseñamos un plan de estudio acorde a tu necesidad y ritmo.' },
    { icon: 'Headphones', title: 'Clases en vivo', desc: 'Sesiones sincrónicas, dinámicas e interactivas con tu docente.' },
    { icon: 'Trophy', title: 'Certificación', desc: 'Te preparamos para obtener tu certificación oficial.' },
  ],
}

export const levels = [
  { code: 'A1', name: 'Principiante', hours: '80–100 h' },
  { code: 'A2', name: 'Básico', hours: '100–120 h' },
  { code: 'B1', name: 'Intermedio', hours: '150–180 h' },
  { code: 'B2', name: 'Intermedio alto', hours: '180–200 h' },
  { code: 'C1', name: 'Avanzado', hours: '200–220 h' },
  { code: 'C2', name: 'Maestría', hours: '220+ h' },
]

// ⚠️ PLACEHOLDER — datos reales de docentes (nombre, especialidad, credenciales, foto)
export const teachers = [
  {
    name: 'Docente certificado/a',
    role: 'English Teacher · TEFL/TESOL',
    bio: 'Especialista en metodología comunicativa y preparación para exámenes internacionales.',
    initials: 'EP',
  },
  {
    name: 'Docente certificado/a',
    role: 'Business English Coach',
    bio: 'Experiencia en capacitación corporativa y comunicación asertiva en entornos profesionales.',
    initials: 'EP',
  },
  {
    name: 'Docente certificado/a',
    role: 'Exam Prep Specialist (IELTS/TOEFL)',
    bio: 'Acompañamiento estratégico con simulacros para asegurar el éxito en el examen.',
    initials: 'EP',
  },
]

// ⚠️ PLACEHOLDER — reemplazar por testimonios reales con foto, nombre y rol
export const testimonials = [
  {
    quote:
      'Las clases en vivo y en grupos pequeños hicieron toda la diferencia. En pocos meses logré la confianza para mi entrevista de trabajo en inglés.',
    name: 'Estudiante English Pro',
    role: 'Programa Personalizado',
  },
  {
    quote:
      'Me preparé para mi certificación con simulacros y un plan claro. El acompañamiento de los docentes fue clave para aprobar.',
    name: 'Estudiante English Pro',
    role: 'Preparación para exámenes',
  },
  {
    quote:
      'Capacitamos a nuestro equipo con Business English. El enfoque práctico se notó de inmediato en la comunicación con clientes.',
    name: 'Empresa cliente',
    role: 'Business English',
  },
]

export const faqs = [
  {
    q: '¿Las clases son en vivo o grabadas?',
    a: 'Todas nuestras clases son sincrónicas, en vivo, con un docente certificado. Olvídate de los videos pregrabados: aprendes interactuando en tiempo real.',
  },
  {
    q: '¿Qué necesito para tomar las clases?',
    a: 'Manejo básico de computador, conexión a internet y un equipo de cómputo con micrófono y audífonos. Nada más.',
  },
  {
    q: '¿En cuánto tiempo puedo certificarme?',
    a: 'Depende de tu nivel inicial y tu dedicación. De forma orientativa, cada nivel (A1 a C2) toma entre 2 y 7 meses. En tu diagnóstico te damos una ruta personalizada.',
  },
  {
    q: '¿Cuántos estudiantes hay por grupo?',
    a: 'Trabajamos con grupos reducidos de máximo 10 estudiantes para garantizar interacción constante. También ofrecemos clases personalizadas 1 a 1.',
  },
  {
    q: '¿Ofrecen clases para empresas?',
    a: 'Sí. Con Business English diseñamos programas a la medida de tu sector, grupales o personalizados, adaptados a los horarios y objetivos de tu organización.',
  },
  {
    q: '¿La clase de prueba tiene costo?',
    a: 'No. La clase de prueba es gratuita y sin compromiso. Es la mejor forma de conocer nuestra metodología antes de inscribirte.',
  },
]

export const cta = {
  trial: '¡Quiero mi clase de prueba!',
  trialFloating: 'Toma una clase gratis',
  quoteNav: 'Cotiza tu plan',
  test: 'Test de nivel gratis · 15 min',
  quote: 'Cotizar mi plan',
  advisor: 'Chatear con un asesor',
  plans: 'Ver programas',
}

// Mensaje pre-cargado para el botón flotante de clase gratis
export const trialMessage =
  'Hola English Pro 👋, quiero agendar mi clase de prueba gratis.'
