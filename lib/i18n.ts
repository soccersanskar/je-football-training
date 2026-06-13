/**
 * Bilingual content layer (EN / ES).
 * ------------------------------------------------------------------
 * The English data lives in content.ts (single source of truth / facts).
 * Here we provide a Spanish mirror with identical shapes, plus the UI prose
 * that was previously hard-coded in components — so the whole site can switch
 * language at runtime. `getContent(locale)` returns one object the components
 * read from. Facts (coach, clubs, mission language) are preserved in both.
 */
import {
  mission as enMission,
  pillars as enPillars,
  sessionFormats as enFormats,
  pathway as enPathway,
  about as enAbout,
  testimonials as enTestimonials,
  outcomes as enOutcomes,
  faqs as enFaqs,
  type Pillar,
} from "./content";

export type Locale = "en" | "es";
export const LOCALES: Locale[] = ["en", "es"];

// ---------------------------------------------------------------- Spanish data

const esPillars: Pillar[] = [
  {
    id: "technical",
    index: "01",
    name: "Habilidad Técnica",
    tagline: "Domina el balón antes de que él te domine a ti.",
    description:
      "La base de todo jugador de élite. Las sesiones trabajan el control, el primer toque, la técnica de golpeo y el dominio con ambas piernas hasta que la ejecución limpia se vuelve instinto bajo presión.",
    objectives: [
      "Construir un primer toque fiable y orientado bajo presión",
      "Desarrollar comodidad real con ambas piernas en espacios reducidos",
      "Refinar la mecánica de golpeo para potencia, colocación y engaño",
    ],
    skillFocus: [
      "Control y regate",
      "Primer toque y recepción",
      "Rango y peso del pase",
      "Definición y golpeo",
    ],
    benefits: [
      "Ejecución más limpia cuando el juego se acelera",
      "Confianza para recibir en cualquier zona del campo",
      "Una base técnica repetible que aguanta con el cansancio",
    ],
    outcomes: [
      "Toque más fino en situaciones de partido",
      "Mayor rango de pase y definición",
    ],
    accent: "#00E676",
  },
  {
    id: "tactical",
    index: "02",
    name: "Conciencia Táctica",
    tagline: "Lee el juego dos pases por delante.",
    description:
      "Leer espacios, escanear y tomar decisiones. El jugador aprende a reconocer patrones, posicionarse con inteligencia y elegir la acción correcta más rápido de lo que el rival puede reaccionar.",
    objectives: [
      "Mejorar la frecuencia y calidad del escaneo antes de recibir",
      "Reconocer disparadores de presión y espacios libres",
      "Tomar decisiones más rápidas y de mayor porcentaje con el balón",
    ],
    skillFocus: [
      "Escaneo y orientación corporal",
      "Conciencia posicional",
      "Toma de decisiones bajo presión",
      "Lectura y anticipación del juego",
    ],
    benefits: [
      "Jugar siempre con una imagen en mente",
      "Menos pérdidas en zonas peligrosas",
      "Influir en el juego más allá del físico",
    ],
    outcomes: [
      "Posicionamiento más inteligente en cada fase",
      "Decisiones más rápidas y limpias",
    ],
    accent: "#5CFFA8",
  },
  {
    id: "physical",
    index: "03",
    name: "Preparación Física",
    tagline: "Construye el motor que aguanta los 90.",
    description:
      "Velocidad, agilidad, fuerza y resistencia adaptadas a las exigencias del fútbol. Se entrena la calidad del movimiento y la capacidad atlética para que la técnica nunca se rompa al final del partido.",
    objectives: [
      "Desarrollar velocidad y aceleración específicas del fútbol",
      "Mejorar el cambio de dirección y la agilidad",
      "Construir la resistencia para rendir del primer al último silbato",
    ],
    skillFocus: [
      "Aceleración y velocidad punta",
      "Agilidad y juego de pies",
      "Fuerza y estabilidad",
      "Acondicionamiento y recuperación",
    ],
    benefits: [
      "Ganar más duelos al primer balón",
      "Mantener la calidad técnica hasta el final",
      "Moverse con equilibrio, potencia y control",
    ],
    outcomes: ["Mayor techo atlético", "Más durabilidad durante la temporada"],
    accent: "#00C853",
  },
  {
    id: "mental",
    index: "04",
    name: "Fortaleza Mental",
    tagline: "El partido se gana entre las orejas.",
    description:
      "Confianza, concentración y resiliencia competitiva. Se reta al jugador a mantener la calma, recuperarse de los errores y aportar intensidad y convicción en cada repetición y cada partido.",
    objectives: [
      "Construir una confianza inquebrantable con el balón",
      "Desarrollar concentración y temple bajo presión",
      "Reforzar la resiliencia y la mentalidad competitiva",
    ],
    skillFocus: [
      "Confianza y autoestima",
      "Concentración y temple",
      "Resiliencia tras el error",
      "Intensidad competitiva",
    ],
    benefits: [
      "Jugar con libertad, sin miedo a fallar",
      "Recuperarse rápido de los baches en el partido",
      "Llevar estándares de élite a cada sesión",
    ],
    outcomes: [
      "Una identidad competitiva más fuerte",
      "Temple en los momentos que deciden los partidos",
    ],
    accent: "#9FFFC9",
  },
];

const esFormats = [
  {
    id: "one-to-one",
    name: "Entrenamiento Privado 1 a 1",
    summary:
      "Sesiones totalmente individualizadas, diseñadas en torno al perfil, los objetivos y el calendario de un solo jugador.",
    bestFor: "Jugadores que buscan un desarrollo enfocado y acelerado.",
    inquire: true,
  },
  {
    id: "small-group",
    name: "Entrenamiento en Grupo Reducido",
    summary:
      "Entrena con un grupo pequeño de nivel similar — repeticiones competitivas con entrenamiento personalizado.",
    bestFor: "Jugadores que crecen con la competencia y la presión real de juego.",
    inquire: true,
  },
  {
    id: "position-specific",
    name: "Sesiones por Posición",
    summary:
      "Trabajo específico para las exigencias concretas de tu rol en el campo.",
    bestFor: "Jugadores que se preparan para el camino universitario o profesional.",
    inquire: true,
  },
];

const esPathway = [
  { id: "dream", chapter: "Capítulo I", title: "El Sueño", line: "Empieza con un balón y la decisión de ser mejor." },
  { id: "train", chapter: "Capítulo II", title: "El Entrenamiento", line: "Trabajo individualizado que convierte la ambición en talento." },
  { id: "transform", chapter: "Capítulo III", title: "La Transformación", line: "Velocidad, técnica y confianza se suman en un jugador completo." },
  { id: "perform", chapter: "Capítulo IV", title: "La Actuación", line: "Todo lo ganado en el entrenamiento, entregado cuando cuenta." },
];

const esAbout = {
  headline: "Entrenado por un profesional. Construido para tu siguiente nivel.",
  bio: [
    "JE Football Training está dirigido por Jesús Enríquez — un futbolista profesional cuya carrera ha recorrido clubes por todo Estados Unidos.",
    "Desde 2018, Jesús se ha dedicado al desarrollo de jugadores, apoyándose en más de ocho años de experiencia como entrenador para formar atletas desde la base.",
    "Su misión es simple: ofrecer un entrenamiento individualizado y enfocado, diseñado para elevar las habilidades de cada jugador y llevarlo al siguiente nivel — ya sea el fútbol profesional, un puesto en un equipo universitario, o simplemente convertirte en la mejor versión de ti mismo en el campo.",
  ],
  philosophy: [
    { title: "Individualizado", body: "No hay dos jugadores iguales. Cada sesión se adapta al atleta que tiene enfrente." },
    { title: "Enfocado", body: "Trabajo deliberado en lo que de verdad marca la diferencia — técnico, táctico, físico, mental." },
    { title: "Elevador", body: "El estándar siempre es el siguiente nivel: profesional, universitario o tu mejor versión." },
  ],
};

const esTestimonials = [
  { id: "t1", placeholder: true, quote: "Añade aquí un testimonio real de un jugador o padre — el diseño está listo para ello.", name: "Nombre del jugador / padre", role: "Añade el rol (p. ej. jugador sub-16, padre)" },
  { id: "t2", placeholder: true, quote: "Añade un segundo testimonio verificado. Que sea específico y en sus propias palabras.", name: "Nombre del jugador / padre", role: "Añade el rol" },
  { id: "t3", placeholder: true, quote: "Un tercer testimonio real refuerza la confianza. Reemplaza este texto cuando lo tengas.", name: "Nombre del jugador / padre", role: "Añade el rol" },
];

const esOutcomes = [
  { label: "Precisión Técnica", metric: "Mejor toque y definición" },
  { label: "Inteligencia de Juego", metric: "Decisiones más rápidas e inteligentes" },
  { label: "Techo Atlético", metric: "Más velocidad, agilidad y potencia" },
  { label: "Mentalidad Competitiva", metric: "Confianza bajo presión" },
];

const esFaqs = [
  { q: "¿Para quién es JE Football Training?", a: "Para jugadores que aspiran a jugar de forma profesional, a nivel universitario, o cualquiera que simplemente quiera mejorar su juego. Las sesiones son individualizadas, así que se adaptan al atleta que tiene enfrente el entrenador." },
  { q: "¿Quién dirige el entrenamiento?", a: "Jesús Enríquez — un futbolista profesional que se ha dedicado al desarrollo de jugadores desde 2018, con más de ocho años de experiencia como entrenador." },
  { q: "¿En qué se centra una sesión?", a: "Cada sesión se construye sobre cuatro pilares: habilidad técnica, conciencia táctica, preparación física y fortaleza mental — ponderados según las necesidades de cada jugador." },
  { q: "¿Qué formatos de entrenamiento hay?", a: "Entrenamiento privado 1 a 1, sesiones en grupo reducido y trabajo por posición. El formato adecuado depende de tus objetivos — contáctanos y te recomendaremos un camino." },
  { q: "¿Dónde se realizan las sesiones?", a: "El entrenamiento tiene su base en el Área de la Bahía, California. Ponte en contacto para conocer ubicaciones y disponibilidad actuales." },
  { q: "¿Cómo reservo?", a: "Las reservas se gestionan a través de nuestra plataforma de agendado. Toca «Reserva una Sesión» para ver la disponibilidad en vivo y apartar tu lugar." },
];

const esNav = [
  { label: "Inicio", href: "/" },
  { label: "Programas", href: "/programs" },
  { label: "Nosotros", href: "/about" },
  { label: "Testimonios", href: "/testimonials" },
  { label: "Preguntas", href: "/faq" },
  { label: "Contacto", href: "/contact" },
];

const enNav = [
  { label: "Home", href: "/" },
  { label: "Programs", href: "/programs" },
  { label: "About", href: "/about" },
  { label: "Testimonials", href: "/testimonials" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
];

// ---------------------------------------------------------------- UI prose

const ui = {
  en: {
    common: {
      bookSession: "Book a Session",
      viewPrograms: "View Programs",
      trainWithJE: "Train With JE",
      contactUs: "Contact Us",
      bookNow: "Book Now",
      sample: "Sample",
      explore: "Explore",
      connect: "Connect",
      positioning: "Elite Performance Training",
      tagline: "Maximize Your Full Potential.",
    },
    hero: {
      eyebrow: "Elite Performance Training",
      title1: "EVERY GREAT PLAYER",
      title2: "STARTS SOMEWHERE",
      sub: ["One dream.", "One ball.", "One opportunity."],
      cue: "Begin the journey",
    },
    rail: { dream: "Dream", train: "Train", transform: "Transform", perform: "Perform" },
    dream: {
      eyebrow: "Chapter I — The Dream",
      title1: "IT STARTS WITH A",
      title2: "SINGLE TOUCH",
      missionLabel: "The Mission",
      detail:
        "Before the trophies, the academies, the floodlit nights — there is a player, a ball, and a decision to be better than yesterday. This is where that decision is honoured.",
      quote: "“MAXIMIZE YOUR FULL POTENTIAL.”",
      promise: "The JE promise",
    },
    training: {
      eyebrow: "Chapter II — The Training",
      title1: "INDIVIDUALIZED.",
      title2: "FOCUSED. RELENTLESS.",
      intro:
        "Every session is built around four pillars — weighted to the athlete in front of the coach. No filler. No generic drills. Only the work that moves you to the next level.",
      objectivesLabel: "Development Objectives",
      skillLabel: "Skill Focus",
      benefitsLabel: "Benefits",
      outcomesLabel: "Training Outcomes",
      methodEyebrow: "The Methodology",
      methodTitle: "CHOOSE YOUR PATH",
      methodIntro:
        "The right format depends on your goals. Every path runs through the same four pillars — the difference is intensity, competition and focus.",
      bestFor: "Best for",
    },
    transformation: {
      eyebrow: "Chapter III — The Transformation",
      title1: "WATCH A PLAYER",
      title2: "BECOME COMPLETE",
      intro:
        "Speed, technique and confidence don't arrive at once — they compound. Session after session, the attributes that define an elite footballer rise together until a complete player stands on the pitch.",
      note: "Attribute levels are illustrative of the development arc.",
      attributes: [
        { label: "Speed", value: 94 },
        { label: "Technique", value: 91 },
        { label: "Confidence", value: 96 },
        { label: "Decision Making", value: 89 },
        { label: "Agility", value: 92 },
        { label: "Ball Mastery", value: 95 },
      ],
    },
    results: {
      eyebrow: "Chapter IV — The Results",
      title1: "DEVELOPMENT YOU",
      title2: "CAN SEE ON THE PITCH",
      wordsEyebrow: "In Their Words",
      affiliationsEyebrow: "Experience Across The Game",
      affiliationsNote:
        "Clubs reflect coach Jesus Enriquez's professional playing experience.",
    },
    performance: {
      eyebrow: "Chapter V — The Performance",
      title1: "THIS IS THE",
      title2: "MOMENT",
      sub: "Everything earned in training — delivered when it counts.",
    },
    conversion: {
      eyebrow: "Your Turn",
      title1: "START YOUR",
      title2: "DEVELOPMENT JOURNEY",
      body: "Every great player started somewhere. Train with professional footballer Jesus Enriquez and find out how far focused, individualized work can take you.",
    },
    footer: {
      blurb:
        "Individualized football development with professional footballer Jesus Enriquez.",
    },
    programs: {
      eyebrow: "What We Build",
      title1: "THE FOUR PILLARS OF",
      title2: "PLAYER DEVELOPMENT",
      intro:
        "Every JE session is individualized and focused — built around four pillars and weighted to the athlete in front of the coach. Below is the full development blueprint, from objectives to outcomes.",
      formatsTitle: "TRAINING FORMATS",
      formatsIntro:
        "Choose the structure that matches your goals. Pricing and live availability are handled through our booking platform.",
      ctaTitle: "READY TO START?",
      ctaBody: "Book a session and we'll build the right path for you.",
    },
    aboutPage: {
      eyebrow: "The Coach",
      title1: "COACHED BY A",
      title2: "PROFESSIONAL",
      since: "Coaching since",
      experience: "Training experience",
      california: "California",
      philosophyLabel: "Coaching Philosophy",
      experienceLabel: "Professional Playing Experience",
    },
    testimonialsPage: {
      eyebrow: "In Their Words",
      title1: "BUILT ON",
      title2: "RESULTS",
      intro:
        "The outcomes below reflect the four pillars every athlete trains. Player and parent testimonials slot in here as they're collected.",
      invite: "Are you a JE player or parent? We'd love to feature your story — reach out via the",
      contactPage: "contact page",
    },
    faqPage: {
      eyebrow: "Good To Know",
      title1: "QUESTIONS,",
      title2: "ANSWERED",
      intro:
        "Everything you need before your first session. Still unsure? Reach out — we're happy to help you find the right path.",
      stillQ: "Still have a question? We'll get you an answer.",
    },
    contact: {
      eyebrow: "Get In Touch",
      title1: "LET'S BUILD YOUR",
      title2: "NEXT LEVEL",
      intro:
        "Tell us about the player and your goals, and we'll help you find the right path. Based in the Bay Area, California.",
      locationLabel: "Location",
      locationNote: "Contact us for current training locations and availability.",
      followLabel: "Follow",
      bookDirect: "Book Directly →",
      bookDirectNote:
        "See live availability and reserve a session on our scheduling platform.",
      form: {
        name: "Player / Parent Name",
        email: "Email",
        phone: "Phone (optional)",
        level: "Player Age / Level",
        goals: "What are your goals?",
        goalsPlaceholder:
          "Tell us about the player and what you're hoping to achieve…",
        send: "Send Message",
        prefer: "Prefer to book straight away? Use the scheduling platform on the Booking page.",
        doneTitle: "MESSAGE READY",
        doneBody:
          "Thanks for reaching out. For the fastest response, book a session directly — live availability is on our scheduling platform.",
      },
    },
    booking: {
      eyebrow: "Reserve Your Spot",
      title1: "BOOK A",
      title2: "SESSION",
      intro:
        "Booking is fast. Choose a format, see live availability on our scheduling platform, and lock in your session.",
      liveLabel: "Live Availability",
      openTitle: "OPEN THE BOOKING PLATFORM",
      openBody:
        "Secure scheduling powered by UpperHand. See open times and reserve in a couple of taps.",
      chooseFormat: "CHOOSE A FORMAT",
      select: "Select →",
      steps: [
        { n: "01", title: "Choose your format", body: "1-on-1, small group, or position-specific — pick what matches your goals." },
        { n: "02", title: "Pick a time", body: "Open the scheduling platform to see live availability and reserve a slot." },
        { n: "03", title: "Tell us your goals", body: "Share where you are and where you want to be so the session is built for you." },
        { n: "04", title: "Train with JE", body: "Show up ready to work. Every rep is focused on your next level." },
      ],
    },
  },
  es: {
    common: {
      bookSession: "Reserva una Sesión",
      viewPrograms: "Ver Programas",
      trainWithJE: "Entrena con JE",
      contactUs: "Contáctanos",
      bookNow: "Reservar",
      sample: "Ejemplo",
      explore: "Explorar",
      connect: "Conecta",
      positioning: "Entrenamiento de Alto Rendimiento",
      tagline: "Maximiza Tu Máximo Potencial.",
    },
    hero: {
      eyebrow: "Entrenamiento de Alto Rendimiento",
      title1: "TODO GRAN JUGADOR",
      title2: "EMPIEZA EN ALGÚN LUGAR",
      sub: ["Un sueño.", "Un balón.", "Una oportunidad."],
      cue: "Comienza el viaje",
    },
    rail: { dream: "Sueño", train: "Entrena", transform: "Transforma", perform: "Rinde" },
    dream: {
      eyebrow: "Capítulo I — El Sueño",
      title1: "EMPIEZA CON UN",
      title2: "SOLO TOQUE",
      missionLabel: "La Misión",
      detail:
        "Antes de los trofeos, las academias, las noches bajo los reflectores — hay un jugador, un balón y la decisión de ser mejor que ayer. Aquí es donde se honra esa decisión.",
      quote: "“MAXIMIZA TU MÁXIMO POTENCIAL.”",
      promise: "La promesa JE",
    },
    training: {
      eyebrow: "Capítulo II — El Entrenamiento",
      title1: "INDIVIDUALIZADO.",
      title2: "ENFOCADO. IMPLACABLE.",
      intro:
        "Cada sesión se construye sobre cuatro pilares — ponderados según el atleta que tiene enfrente el entrenador. Sin relleno. Sin ejercicios genéricos. Solo el trabajo que te lleva al siguiente nivel.",
      objectivesLabel: "Objetivos de Desarrollo",
      skillLabel: "Enfoque Técnico",
      benefitsLabel: "Beneficios",
      outcomesLabel: "Resultados del Entrenamiento",
      methodEyebrow: "La Metodología",
      methodTitle: "ELIGE TU CAMINO",
      methodIntro:
        "El formato adecuado depende de tus objetivos. Todos los caminos pasan por los mismos cuatro pilares — la diferencia es la intensidad, la competencia y el enfoque.",
      bestFor: "Ideal para",
    },
    transformation: {
      eyebrow: "Capítulo III — La Transformación",
      title1: "MIRA A UN JUGADOR",
      title2: "VOLVERSE COMPLETO",
      intro:
        "La velocidad, la técnica y la confianza no llegan de golpe — se acumulan. Sesión tras sesión, los atributos que definen a un futbolista de élite crecen juntos hasta que un jugador completo pisa el campo.",
      note: "Los niveles de atributos son ilustrativos del proceso de desarrollo.",
      attributes: [
        { label: "Velocidad", value: 94 },
        { label: "Técnica", value: 91 },
        { label: "Confianza", value: 96 },
        { label: "Decisiones", value: 89 },
        { label: "Agilidad", value: 92 },
        { label: "Dominio del Balón", value: 95 },
      ],
    },
    results: {
      eyebrow: "Capítulo IV — Los Resultados",
      title1: "UN DESARROLLO QUE",
      title2: "SE VE EN EL CAMPO",
      wordsEyebrow: "En Sus Palabras",
      affiliationsEyebrow: "Experiencia en el Fútbol",
      affiliationsNote:
        "Los clubes reflejan la experiencia profesional como jugador del entrenador Jesús Enríquez.",
    },
    performance: {
      eyebrow: "Capítulo V — La Actuación",
      title1: "ESTE ES EL",
      title2: "MOMENTO",
      sub: "Todo lo ganado en el entrenamiento — entregado cuando cuenta.",
    },
    conversion: {
      eyebrow: "Tu Turno",
      title1: "COMIENZA TU",
      title2: "CAMINO DE DESARROLLO",
      body: "Todo gran jugador empezó en algún lugar. Entrena con el futbolista profesional Jesús Enríquez y descubre hasta dónde te puede llevar un trabajo enfocado e individualizado.",
    },
    footer: {
      blurb:
        "Desarrollo futbolístico individualizado con el futbolista profesional Jesús Enríquez.",
    },
    programs: {
      eyebrow: "Lo Que Construimos",
      title1: "LOS CUATRO PILARES DEL",
      title2: "DESARROLLO DEL JUGADOR",
      intro:
        "Cada sesión JE es individualizada y enfocada — construida sobre cuatro pilares y ponderada según el atleta que tiene enfrente el entrenador. Abajo está el plan de desarrollo completo, de objetivos a resultados.",
      formatsTitle: "FORMATOS DE ENTRENAMIENTO",
      formatsIntro:
        "Elige la estructura que se ajuste a tus objetivos. Los precios y la disponibilidad en vivo se gestionan en nuestra plataforma de reservas.",
      ctaTitle: "¿LISTO PARA EMPEZAR?",
      ctaBody: "Reserva una sesión y construiremos el camino adecuado para ti.",
    },
    aboutPage: {
      eyebrow: "El Entrenador",
      title1: "ENTRENADO POR UN",
      title2: "PROFESIONAL",
      since: "Entrenando desde",
      experience: "Experiencia entrenando",
      california: "California",
      philosophyLabel: "Filosofía de Entrenamiento",
      experienceLabel: "Experiencia Profesional como Jugador",
    },
    testimonialsPage: {
      eyebrow: "En Sus Palabras",
      title1: "CONSTRUIDO SOBRE",
      title2: "RESULTADOS",
      intro:
        "Los resultados de abajo reflejan los cuatro pilares que entrena cada atleta. Los testimonios de jugadores y padres se irán añadiendo aquí a medida que se recopilen.",
      invite: "¿Eres jugador o padre de JE? Nos encantaría contar tu historia — escríbenos en la",
      contactPage: "página de contacto",
    },
    faqPage: {
      eyebrow: "Bueno Saber",
      title1: "PREGUNTAS,",
      title2: "RESUELTAS",
      intro:
        "Todo lo que necesitas antes de tu primera sesión. ¿Aún con dudas? Escríbenos — con gusto te ayudamos a encontrar el camino adecuado.",
      stillQ: "¿Aún tienes una pregunta? Te conseguimos una respuesta.",
    },
    contact: {
      eyebrow: "Ponte en Contacto",
      title1: "CONSTRUYAMOS TU",
      title2: "SIGUIENTE NIVEL",
      intro:
        "Cuéntanos sobre el jugador y tus objetivos, y te ayudaremos a encontrar el camino adecuado. Con base en el Área de la Bahía, California.",
      locationLabel: "Ubicación",
      locationNote: "Contáctanos para conocer ubicaciones y disponibilidad actuales.",
      followLabel: "Síguenos",
      bookDirect: "Reserva Directamente →",
      bookDirectNote:
        "Mira la disponibilidad en vivo y reserva una sesión en nuestra plataforma de agendado.",
      form: {
        name: "Nombre del jugador / padre",
        email: "Correo electrónico",
        phone: "Teléfono (opcional)",
        level: "Edad / Nivel del jugador",
        goals: "¿Cuáles son tus objetivos?",
        goalsPlaceholder:
          "Cuéntanos sobre el jugador y lo que esperas lograr…",
        send: "Enviar Mensaje",
        prefer: "¿Prefieres reservar de una vez? Usa la plataforma de agendado en la página de Reservas.",
        doneTitle: "MENSAJE LISTO",
        doneBody:
          "Gracias por escribir. Para la respuesta más rápida, reserva una sesión directamente — la disponibilidad en vivo está en nuestra plataforma de agendado.",
      },
    },
    booking: {
      eyebrow: "Aparta Tu Lugar",
      title1: "RESERVA UNA",
      title2: "SESIÓN",
      intro:
        "Reservar es rápido. Elige un formato, mira la disponibilidad en vivo en nuestra plataforma y asegura tu sesión.",
      liveLabel: "Disponibilidad en Vivo",
      openTitle: "ABRIR LA PLATAFORMA DE RESERVAS",
      openBody:
        "Agendado seguro con UpperHand. Mira los horarios libres y reserva en un par de toques.",
      chooseFormat: "ELIGE UN FORMATO",
      select: "Seleccionar →",
      steps: [
        { n: "01", title: "Elige tu formato", body: "1 a 1, grupo reducido o por posición — elige lo que se ajuste a tus objetivos." },
        { n: "02", title: "Elige un horario", body: "Abre la plataforma de agendado para ver la disponibilidad en vivo y reservar." },
        { n: "03", title: "Cuéntanos tus objetivos", body: "Comparte dónde estás y a dónde quieres llegar para construir la sesión a tu medida." },
        { n: "04", title: "Entrena con JE", body: "Llega listo para trabajar. Cada repetición se enfoca en tu siguiente nivel." },
      ],
    },
  },
} as const;

// ---------------------------------------------------------------- assembly

const data = {
  en: {
    mission: enMission,
    pillars: enPillars,
    sessionFormats: enFormats,
    pathway: enPathway,
    about: enAbout,
    testimonials: enTestimonials,
    outcomes: enOutcomes,
    faqs: enFaqs,
    nav: enNav,
    ui: ui.en,
  },
  es: {
    mission: {
      lead: "Todo gran jugador empieza en algún lugar.",
      statement:
        "Entrenamiento individualizado y enfocado, diseñado para elevar tus habilidades y llevarte al siguiente nivel.",
      detail:
        "Desde 2018, Jesús Enríquez se ha dedicado a desarrollar jugadores mediante sesiones a medida construidas sobre la habilidad técnica, la conciencia táctica, la preparación física y la fortaleza mental — ya quieras jugar de forma profesional, a nivel universitario, o simplemente mejorar tu juego.",
    },
    pillars: esPillars,
    sessionFormats: esFormats,
    pathway: esPathway,
    about: esAbout,
    testimonials: esTestimonials,
    outcomes: esOutcomes,
    faqs: esFaqs,
    nav: esNav,
    ui: ui.es,
  },
};

export type SiteContent = (typeof data)["en"];

export function getContent(locale: Locale): SiteContent {
  return (data[locale] ?? data.en) as SiteContent;
}

export function detectLocale(): Locale {
  if (typeof window === "undefined") return "en";
  try {
    const saved = window.localStorage.getItem("je-locale");
    if (saved === "en" || saved === "es") return saved;
  } catch {}
  const nav = navigator.language || "en";
  return nav.toLowerCase().startsWith("es") ? "es" : "en";
}
