/**
 * SINGLE SOURCE OF TRUTH — JE Football Training
 * ------------------------------------------------------------------
 * Everything here is derived from the live site (jefootballtraining.com)
 * and verified public profiles. Facts are preserved; nothing about
 * pricing, named testimonials, certifications, or player outcomes is
 * invented. Slots that require REAL data the business must supply are
 * marked `placeholder: true` so they are never mistaken for fact.
 */

export const brand = {
  name: "JE Football Training",
  shortName: "JE",
  tagline: "Maximize Your Full Potential.",
  // Verbatim positioning from the live site.
  positioning: "Elite Performance Training",
  coach: "Jesus Enriquez",
  location: "Bay Area, California",
  // CTA label used on the live site.
  primaryCtaLabel: "Train With JE",
  bookingUrl:
    "https://app.upperhand.io/customers/2675-je-football-training/events",
  email: "", // not published on the live site — fill when available
  social: {
    instagram: "https://instagram.com/jefootballtraining",
    facebook: "https://facebook.com/jefootballtraining",
    youtube: "https://youtube.com/@jefootballtraining",
    tiktok: "https://tiktok.com/@jefootballtraining",
  },
};

/** Mission — verbatim language from the live site. */
export const mission = {
  lead: "Every great player starts somewhere.",
  statement:
    "Individualized, focused training designed to elevate your skills and take you to the next level.",
  detail:
    "Since 2018, Jesus Enriquez has dedicated himself to developing players through tailored sessions built around technical ability, tactical awareness, physical conditioning, and mental strength — whether you are aspiring to play professionally, at the collegiate level, or simply looking to improve your game.",
};

/**
 * The FOUR REAL PILLARS the site states it trains. These are not invented
 * programs — they are the actual development focus areas, expanded into
 * depth (objectives, skill focus, benefits, outcomes) for the experience.
 */
export type Pillar = {
  id: string;
  index: string;
  name: string;
  tagline: string;
  description: string;
  objectives: string[];
  skillFocus: string[];
  benefits: string[];
  outcomes: string[];
  accent: string;
};

export const pillars: Pillar[] = [
  {
    id: "technical",
    index: "01",
    name: "Technical Ability",
    tagline: "Master the ball before it masters you.",
    description:
      "The foundation of every elite player. Sessions drill close control, first touch, striking technique and both-footed mastery until clean execution becomes instinct under pressure.",
    objectives: [
      "Build a reliable, directional first touch under pressure",
      "Develop genuine two-footed comfort in tight spaces",
      "Refine striking mechanics for power, placement and disguise",
    ],
    skillFocus: [
      "Close control & dribbling",
      "First touch & receiving",
      "Passing range & weight",
      "Finishing & ball striking",
    ],
    benefits: [
      "Cleaner execution when the game speeds up",
      "Confidence to receive in any area of the pitch",
      "A repeatable technical base that holds under fatigue",
    ],
    outcomes: [
      "Sharper touch in match situations",
      "Expanded passing and finishing range",
    ],
    accent: "#00E676",
  },
  {
    id: "tactical",
    index: "02",
    name: "Tactical Awareness",
    tagline: "See the game two passes ahead.",
    description:
      "Reading space, scanning, and decision-making. Players learn to recognise patterns, position intelligently, and choose the right action faster than the opposition can react.",
    objectives: [
      "Improve scanning frequency and quality before receiving",
      "Recognise pressing triggers and pockets of space",
      "Make faster, higher-percentage decisions on the ball",
    ],
    skillFocus: [
      "Scanning & body orientation",
      "Positional awareness",
      "Decision-making under pressure",
      "Game reading & anticipation",
    ],
    benefits: [
      "Always playing with a picture in mind",
      "Fewer turnovers in dangerous areas",
      "Influence on the game beyond pure athleticism",
    ],
    outcomes: [
      "Smarter positioning across phases of play",
      "Faster, cleaner decision-making",
    ],
    accent: "#5CFFA8",
  },
  {
    id: "physical",
    index: "03",
    name: "Physical Conditioning",
    tagline: "Build the engine that lasts 90.",
    description:
      "Speed, agility, strength and endurance tailored to the demands of football. Movement quality and athletic capacity are trained so technique never breaks down late in matches.",
    objectives: [
      "Develop football-specific speed and acceleration",
      "Improve change-of-direction and agility",
      "Build the endurance to perform from first to final whistle",
    ],
    skillFocus: [
      "Acceleration & top speed",
      "Agility & footwork",
      "Strength & stability",
      "Conditioning & recovery",
    ],
    benefits: [
      "Win more first-to-the-ball moments",
      "Hold technical quality deep into matches",
      "Move with balance, power and control",
    ],
    outcomes: [
      "Higher athletic ceiling",
      "Greater durability across a season",
    ],
    accent: "#00C853",
  },
  {
    id: "mental",
    index: "04",
    name: "Mental Strength",
    tagline: "The game is won between the ears.",
    description:
      "Confidence, focus and competitive resilience. Players are challenged to stay composed, bounce back from mistakes, and bring intensity and belief to every rep and every match.",
    objectives: [
      "Build unshakeable confidence on the ball",
      "Develop focus and composure under pressure",
      "Strengthen resilience and a competitive mindset",
    ],
    skillFocus: [
      "Confidence & self-belief",
      "Focus & composure",
      "Resilience after mistakes",
      "Competitive intensity",
    ],
    benefits: [
      "Play freely without fear of failure",
      "Recover quickly from setbacks in-game",
      "Bring elite standards to every session",
    ],
    outcomes: [
      "A stronger competitive identity",
      "Composure in the moments that decide games",
    ],
    accent: "#9FFFC9",
  },
];

/**
 * Session formats — based on the site's stated "individualized" and
 * "tailored" model. Pricing is intentionally NOT listed (the live site
 * routes pricing through UpperHand). `inquire` keeps it honest.
 */
export const sessionFormats = [
  {
    id: "one-to-one",
    name: "1-on-1 Private Training",
    summary:
      "Fully individualized sessions built around a single player's profile, goals and timeline.",
    bestFor: "Players who want focused, accelerated development.",
    inquire: true,
  },
  {
    id: "small-group",
    name: "Small Group Training",
    summary:
      "Train with a small group at a similar level — competitive reps with personalised coaching.",
    bestFor: "Players who thrive on competition and game-realistic pressure.",
    inquire: true,
  },
  {
    id: "position-specific",
    name: "Position-Specific Sessions",
    summary:
      "Targeted work for the specific demands of your role on the pitch.",
    bestFor: "Players preparing for collegiate or professional pathways.",
    inquire: true,
  },
];

/**
 * Affiliations shown on the live site (club crests / experience). REAL —
 * crest images mirrored locally from static.wixstatic.com to /public/brand.
 */
export const affiliations = [
  { name: "Houston Dynamo", logo: "/brand/houston-dynamo.png" },
  { name: "Oakland Roots FC", logo: "/brand/oakland-roots-fc.png" },
  { name: "Reno 1868 FC", logo: "/brand/reno-1868-fc.png" },
  { name: "San Antonio FC", logo: "/brand/san-antonio-fc.png" },
  { name: "RVG FC Toros", logo: "/brand/rvg-fc-toros.png" },
];

/** Coaching pathway — the development journey of the experience. */
export const pathway = [
  {
    id: "dream",
    chapter: "Chapter I",
    title: "The Dream",
    line: "It starts with one ball and one decision to be better.",
  },
  {
    id: "train",
    chapter: "Chapter II",
    title: "The Training",
    line: "Individualized work that turns ambition into ability.",
  },
  {
    id: "transform",
    chapter: "Chapter III",
    title: "The Transformation",
    line: "Speed, technique and confidence compound into a complete player.",
  },
  {
    id: "perform",
    chapter: "Chapter IV",
    title: "The Performance",
    line: "Everything earned in training, delivered when it counts.",
  },
];

/** About — verified facts only. */
export const about = {
  headline: "Coached by a professional. Built for your next level.",
  bio: [
    "JE Football Training is led by Jesus Enriquez — a professional footballer whose career has spanned clubs across the United States.",
    "Since 2018, Jesus has dedicated himself to player development, drawing on over eight years of training experience to build athletes from the ground up.",
    "His mission is simple: provide individualized, focused training designed to elevate each player's skills and take them to the next level — whether the goal is professional football, a collegiate roster spot, or simply becoming the best version of yourself on the pitch.",
  ],
  philosophy: [
    {
      title: "Individualized",
      body: "No two players are the same. Every session is tailored to the athlete in front of him.",
    },
    {
      title: "Focused",
      body: "Deliberate work on the things that actually move the needle — technical, tactical, physical, mental.",
    },
    {
      title: "Elevating",
      body: "The standard is always the next level: professional, collegiate, or your personal best.",
    },
  ],
};

/**
 * Testimonials — PLACEHOLDER STRUCTURE ONLY.
 * The live site does not publish named testimonials. These are clearly
 * marked so the business can drop in real quotes without code changes.
 * Do not present these as real endorsements.
 */
export const testimonials = [
  {
    id: "t1",
    placeholder: true,
    quote:
      "Add a real player or parent testimonial here — the layout is ready for it.",
    name: "Player / Parent Name",
    role: "Add role (e.g. U16 player, parent)",
  },
  {
    id: "t2",
    placeholder: true,
    quote:
      "Add a second verified testimonial. Keep it specific and in their own words.",
    name: "Player / Parent Name",
    role: "Add role",
  },
  {
    id: "t3",
    placeholder: true,
    quote:
      "A third real testimonial reinforces trust. Replace this copy when available.",
    name: "Player / Parent Name",
    role: "Add role",
  },
];

/** Outcome categories — framed as what the training develops (REAL pillars). */
export const outcomes = [
  { label: "Technical Sharpness", metric: "Cleaner touch & finishing" },
  { label: "Game Intelligence", metric: "Faster, smarter decisions" },
  { label: "Athletic Ceiling", metric: "More speed, agility & power" },
  { label: "Competitive Mindset", metric: "Confidence under pressure" },
];

export const faqs = [
  {
    q: "Who is JE Football Training for?",
    a: "Players aspiring to play professionally, at the collegiate level, or anyone simply looking to improve their game. Sessions are individualized, so they scale to the athlete in front of the coach.",
  },
  {
    q: "Who runs the training?",
    a: "Jesus Enriquez — a professional footballer who has dedicated himself to player development since 2018, with over eight years of training experience.",
  },
  {
    q: "What does a session focus on?",
    a: "Every session is built around four pillars: technical ability, tactical awareness, physical conditioning, and mental strength — weighted to each player's needs.",
  },
  {
    q: "What training formats are available?",
    a: "1-on-1 private training, small group sessions, and position-specific work. The right format depends on your goals — reach out and we'll recommend a path.",
  },
  {
    q: "Where are sessions held?",
    a: "Training is based in the Bay Area, California. Get in touch for current locations and availability.",
  },
  {
    q: "How do I book?",
    a: "Booking is handled through our scheduling platform. Tap “Book a Session” to see live availability and reserve your spot.",
  },
];

export const nav = [
  { label: "Home", href: "/" },
  { label: "Programs", href: "/programs" },
  { label: "About", href: "/about" },
  { label: "Testimonials", href: "/testimonials" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
];
