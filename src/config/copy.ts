// Todo el texto de la landing vive aquí. Sale del guion del VSL y de las publicaciones
// propias de Browinn (Instagram y Facebook). Los componentes solo lo componen.

export const NAV = [
  { href: '#servicios', label: 'Servicios' },
  { href: '#certificacion', label: 'Certificación' },
  { href: '#protocolo', label: 'Protocolo' },
  { href: '#operacion', label: 'En operación' },
]

export const HERO = {
  eyebrow: 'Seguridad física y custodia · Guayaquil',
  // Una entrada por línea: el titular se revela línea por línea
  titleLines: ['Un guardia', 'parado en un', 'punto no es', 'seguridad.'],
  titleAccent: 'Es decoración.',
  subtitle:
    'Los asaltos pasan porque nadie evaluó antes el riesgo real de esa ruta, ese muelle, ese turno. Nosotros diseñamos el protocolo primero.',
  cta: 'Ver el video completo',
  ctaNote: 'Video de 4 minutos · Te pedimos tus datos para enviártelo',
  videoDuration: '4:17',
  trust: ['Certificación BASC vigente', 'Contratos desde 6 meses', 'Supervisión continua'],
}

// Lema que la marca usa en sus propias piezas
export const TAGLINE = 'Disciplina operativa. Protección estratégica.'

// Fotos reales de Browinn (Facebook e Instagram de la empresa). El póster es el VSL.
export const IMAGES = {
  hero: '/img/hero-equipo.webp',
  poster: '/img/vsl-poster.webp',
  closing: '/img/op-unidad.webp',
  story: '/img/formacion-poligono.webp',
}

export const HOOK = {
  title: '¿Alguna vez viste en las noticias un asalto y pensaste "eso me pudo pasar a mí"?',
}

export const MARQUEE = [
  'Custodia fluvial',
  'Custodia terrestre de carga',
  'Vigilancia hotelera',
  'Vigilancia empresarial',
  'Guardianía física 24/7',
  'Control de accesos',
  'Certificación BASC',
]

// Contadores: value es el número que anima; suffix lo que va pegado
export const STATS = [
  { value: 24, suffix: '/7', label: 'Guardianía física' },
  { value: 4, suffix: '', label: 'Verticales con protocolo propio' },
  { value: 6, suffix: '', label: 'Pasos de protocolo, del diagnóstico al reporte' },
  { value: 6, suffix: '+', label: 'Meses de contrato mínimo' },
]

export const VERTICALS_HEAD = {
  index: '01',
  eyebrow: 'Servicios',
  title: 'Cuatro verticales. Un protocolo para cada una.',
  intro:
    'No rotamos guardias genéricos. Cada operación tiene su propio protocolo, su personal y sus puntos de control.',
}

export const VERTICALS = [
  {
    code: 'FLV',
    title: 'Custodia fluvial y marítima',
    text: 'Protección de embarcaciones en ruta y en muelle.',
    tags: ['Embarcaciones', 'Muelles', 'Rutas fluviales'],
    image: '/img/servicio-fluvial.webp',
  },
  {
    code: 'TER',
    title: 'Custodia terrestre',
    text: 'Transporte y carga, incluida la de bananeras.',
    tags: ['Carga', 'Contenedores', 'Rutas'],
    image: '/img/servicio-terrestre.webp',
  },
  {
    code: 'HTL',
    title: 'Vigilancia hotelera',
    text: 'Vigilancia física para hoteles y cadenas hoteleras.',
    tags: ['Accesos', 'Lobby', 'Turnos 24/7'],
    image: '/img/servicio-hotelera.webp',
  },
  {
    code: 'EMP',
    title: 'Vigilancia empresarial',
    text: 'Seguridad bancaria, comercial e industrial.',
    tags: ['Empresas', 'Industrias', 'Comercios'],
    image: '/img/servicio-empresarial.webp',
  },
]

// Datos tal como figuran en el certificado publicado por la empresa
export const CERT = {
  index: '02',
  eyebrow: 'Certificación',
  title: 'Auditados y certificados por World BASC Organization.',
  intro:
    'BASC (Business Alliance for Secure Commerce) certifica a empresas que cumplen estándares internacionales de seguridad en la cadena logística.',
  image: '/img/certificado-basc.webp',
  specs: [
    { k: 'Norma', v: 'BASC Internacional, versión 6-2022' },
    { k: 'Alineación', v: 'Requerimientos mínimos de seguridad C-TPAT' },
    { k: 'Alcance', v: 'Actividades de seguridad física y custodia en Guayaquil' },
    { k: 'Certificado', v: 'N.º ECUGYE00684-1-2' },
    { k: 'Vigencia', v: 'Hasta agosto de 2027' },
  ],
}

export const TRAINING = {
  index: '03',
  eyebrow: 'Formación',
  title: 'La formación profesional no se improvisa.',
  intro: 'Criterios de capacitación operativa de cada guardia Browinn.',
  items: [
    'Formación táctica certificada',
    'Protocolo de respuesta bajo presión',
    'Evaluación psicofísica periódica',
    'Código de ética y conducta operativa',
    'Normas de imagen e identidad institucional',
  ],
  photos: [
    { src: '/img/formacion-tactica.webp', w: 900, h: 1100, caption: 'Equipo táctico' },
    { src: '/img/formacion-certificados.webp', w: 1200, h: 900, caption: 'Certificación del personal' },
    { src: '/img/formacion-titulacion.webp', w: 900, h: 675, caption: 'Personal titulado' },
  ],
}

export const STORY = {
  index: '04',
  eyebrow: 'La historia real',
  title: 'Aprendimos que la seguridad sin estructura no funciona.',
  timeline: [
    {
      tag: '2020',
      title: 'Arrancamos',
      text: 'En plena pandemia, en Guayaquil, con gente de confianza y sin protocolo escrito.',
    },
    {
      tag: 'La lección',
      title: 'Un problema que no era nuestro',
      text: 'Un caso legal de un tercero, resuelto a nuestro favor, nos mostró que no podíamos seguir sin estructura.',
    },
    {
      tag: 'Hoy',
      title: 'Protocolo por vertical',
      text: 'Reestructuramos toda la operación. Cada vertical tiene su protocolo y su personal entrenado.',
    },
  ],
}

export const GALLERY = {
  index: '06',
  eyebrow: 'En operación',
  title: 'Así se ve el trabajo en campo.',
  photos: [
    { src: '/img/op-escolta.webp', w: 800, h: 800, caption: 'Unidad de reacción' },
    { src: '/img/op-flota.webp', w: 1200, h: 540, caption: 'Flota de custodia' },
    { src: '/img/op-amanecer.webp', w: 720, h: 960, caption: 'Relevo de turno' },
    { src: '/img/op-carga.webp', w: 720, h: 720, caption: 'Custodia de carga' },
    { src: '/img/op-contenedores.webp', w: 900, h: 900, caption: 'Contenedores' },
    { src: '/img/op-patrulla.webp', w: 720, h: 960, caption: 'Patrulla armada' },
    { src: '/img/op-nocturno.webp', w: 1200, h: 560, caption: 'Operación nocturna' },
  ],
}

export const VALUES = ['Honestidad', 'Respeto', 'Compromiso', 'Responsabilidad', 'Trabajo en equipo', 'Servicio']

export const FIT = {
  index: '07',
  eyebrow: 'Para quién es',
  title: 'Protección sostenida, no un refuerzo de un día.',
  intro: 'Un protocolo real no se diseña ni se sostiene en menos de 6 meses.',
  yes: {
    title: 'Es para ti si',
    items: [
      'Tienes embarcaciones, carga o una empresa que proteger.',
      'Buscas un contrato de 6 meses o más.',
      'Manejas unos 30.000 USD por contrato.',
      'Sabes que tu seguridad no se arregla con un parche.',
    ],
  },
  no: {
    title: 'No es para ti si',
    items: ['Buscas un guardia para una noche.', 'Necesitas cubrir un evento aislado.', 'Quieres algo puntual.'],
  },
}

// Datos de contacto tal como aparecen en las piezas publicadas por la empresa
export const CONTACT = {
  company: 'Browinn Security Cía. Ltda.',
  address: 'Av. Principal, Cdla. La FAE, Solar 6 Mz. 16 · Guayaquil',
  phone: '+593 99 003 3045',
  email: 'gerentecomercial@browinnsecurity.com',
}

export const PROTOCOL = {
  index: '05',
  eyebrow: 'El Protocolo Browinn',
  title: 'No vendemos solo guardias. Vendemos criterio de seguridad.',
  intro: 'El diseño del protocolo y la ejecución nunca se separan. Así se reducen los errores.',
  steps: [
    {
      icon: 'fa-file-signature',
      title: 'Firma del contrato',
      text: 'Formalizamos el alcance y el plazo del servicio.',
    },
    {
      icon: 'fa-route',
      title: 'Diagnóstico y ruta de seguridad',
      text: 'Evaluamos el riesgo real y diseñamos el protocolo para tu operación.',
    },
    {
      icon: 'fa-user-shield',
      title: 'Personal asignado y capacitado',
      text: 'Entrenamos al equipo para esa ruta específica, no para un puesto genérico.',
    },
    {
      icon: 'fa-shield-halved',
      title: 'Ejecución',
      text: 'Ponemos en marcha el protocolo con los puntos de control definidos.',
    },
    {
      icon: 'fa-binoculars',
      title: 'Supervisión continua',
      text: 'Supervisamos durante todo el contrato.',
    },
    {
      icon: 'fa-chart-line',
      title: 'Reporte periódico',
      text: 'Recibes reportes de cómo va tu operación.',
    },
  ],
  promise: 'Si aparece un riesgo nuevo, te avisamos y ajustamos el protocolo contigo. Nada a tus espaldas.',
}

export const START = {
  index: '08',
  eyebrow: 'Cómo empezar',
  title: 'El primer paso es una reunión comercial',
  steps: [
    {
      title: 'Revisamos tu operación',
      text: 'Qué proteges y qué riesgo manejas hoy.',
    },
    {
      title: 'Te decimos si encajas',
      text: 'Directo: si encajas y qué contrato necesitas.',
    },
    {
      title: 'Diseñamos tu protocolo',
      text: 'Ruta, personal y puntos de control a tu medida.',
    },
  ],
}

export const CLOSING = {
  title: 'Primero el protocolo. Después el guardia.',
  text: 'No contratas un guardia para una noche. Contratas un equipo que aprendió lo que pasa cuando no hay estructura detrás de la seguridad.',
  cta: 'Agendar reunión comercial',
}

export const VIDEO_PAGE = {
  eyebrow: 'Paso 1 de 2 · Mira el video',
  title: 'Por qué un guardia sin protocolo no protege tu operación',
  locked: 'El botón para agendar se activa en',
  unlocked: 'Ya puedes solicitar tu reunión comercial',
  cta: 'Quiero una reunión comercial',
}

// ─── Landing VSL (estructura de funnel Bakano) ────────────────────────────────
// Urgencia, hero con video, prueba, autoridad y CTA final. Un solo objetivo:
// ver el video → dejar datos → agendar la reunión.

// Cupos y urgencia. CONFIRMAR CON EL CLIENTE cuántos contratos nuevos toma al mes.
export const SCARCITY = {
  slots: 3,
  unit: 'contratos nuevos este mes',
  bar: 'Solo tomamos 3 contratos nuevos por mes — el cupo de hoy cierra en',
}

export const LANDING_HERO = {
  eyebrow: 'Protocolo Browinn™ · Seguridad física y custodia',
  // El titular se arma en tres partes para resaltar el resultado en rojo
  lead: 'Ayudamos a navieras, transportistas, hoteles y empresas a',
  accent: 'proteger su operación con un protocolo a su medida',
  tail: '— no con guardias de decoración.',
  checks: ['Protocolo por vertical', 'Personal certificado', 'Supervisión continua', 'Certificación BASC'],
  cta: 'Ver el video completo',
  note: 'Video de 4 minutos · Te pedimos tus datos para enviártelo',
}

export const PROOF = {
  eyebrow: 'Respaldo real, no promesas',
  items: [
    { value: 'BASC', label: 'Certificación internacional vigente para seguridad física y custodia en Guayaquil' },
    { value: '24/7', label: 'Guardianía física con relevos y supervisión durante todo el contrato' },
    { value: '4', label: 'Verticales con protocolo propio: fluvial, terrestre, hotelera y empresarial' },
  ],
  cta: 'Quiero esto para mi operación',
}

export const AUTHORITY = {
  badge: 'Empresa certificada BASC',
  eyebrow: 'Conoce a tu equipo de seguridad',
  name: 'Browinn Security',
  role: 'Seguridad física y custodia · Guayaquil',
  image: '/img/formacion-certificados.webp',
  bio: 'Empezamos en 2020 con gente de confianza y sin protocolo escrito. Un problema legal ajeno nos enseñó que la seguridad sin estructura no funciona, así que reestructuramos toda la operación por vertical: cada cliente tiene su protocolo, su personal entrenado y su supervisión.',
  points: [
    'Auditados y certificados por **World BASC Organization**, alineados con los requerimientos de seguridad **C-TPAT**',
    'Personal con **formación táctica certificada**, evaluación psicofísica periódica y código de ética operativa',
    'Flota propia de **custodia terrestre** y equipos para rutas fluviales, hoteles y empresas',
  ],
}

export const FINAL_CTA = {
  question: '¿Sigues confiando tu operación a un guardia',
  accent: 'sin protocolo detrás?',
  text: 'Mira el video y descubre cómo diseñamos el protocolo de seguridad de tu ruta, tu muelle o tu instalación antes de poner a un solo guardia.',
}

export const LEGAL = {
  disclaimer:
    'Esta página es operada por Browinn Security Cía. Ltda., empresa de seguridad física y custodia en Guayaquil, Ecuador. Los servicios se prestan bajo contrato y están sujetos a evaluación previa de cada operación. Este sitio NO está respaldado por Meta Platforms, Inc. ni forma parte de Facebook.',
}
