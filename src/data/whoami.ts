import roy from "@/assets/roy.jpg";

/**
 * Content for /whoami and the home teaser.
 * Filled from Roy's LinkedIn profile. Anything still in [brackets] wasn't
 * in the profile — replace it with the real thing.
 */

type Role = {
  period: string; // e.g. "Mar 2023 — now · Mexico City"
  title: string; // e.g. "Head of Engineering @ Zumma"
  summary: string;
  /** Optional bullets under the summary. */
  highlights?: string[];
  tags: string[];
};

type Whoami = {
  intro: string;
  /** Home teaser, first cell. */
  since: { label: string; value: string };
  current: string;
  facts: { label: string; value: string }[];
  now: { label: string; value: string }[];
  roles: Role[];
  education: { period: string; title: string }[];
  origin: string;
  toolbox: { label: string; value: string }[];
  principles: { title: string; body: string }[];
  offTheClock: string;
  /** Path or URL to a CV PDF (e.g. "/cv.pdf" in /public). Empty hides the button. */
  cvUrl: string;
  /**
   * Photo imported from src/assets (optimized by astro:assets), e.g.
   *   import roy from "@/assets/roy.jpg";  …  photo: roy,
   * null shows a placeholder frame.
   */
  photo: ImageMetadata | null;
};

const whoami: Whoami = {
  intro:
    "Head of Engineering and backend engineer. I build AI-powered fintech products end to end — from early prototypes to production systems.",
  since: { label: "Shipping to production since", value: "2021" },
  current: "Head of Engineering @ Zumma",
  facts: [
    { label: "Name", value: "Royner Perez" },
    { label: "Based in", value: "Mexico City" },
    { label: "Speaks", value: "Spanish · English" },
    { label: "Status", value: "Always open to great opportunities" },
  ],
  now: [
    {
      label: "Working on",
      value: "Leading engineering at Zumma — and the AI agents behind our financial workflows.",
    },
    { label: "Building", value: "Rill, Yurback, and this site — [anything else on the bench]." },
    { label: "Studying", value: "Wrapping up a BSc in Computer Science at University of the People." },
  ],
  roles: [
    {
      period: "Nov 2024 — now · Promoted · Mexico City",
      title: "Head of Engineering @ Zumma",
      summary: "Lead Zumma’s engineering team — and still build critical components and new features myself.",
      highlights: [
        "Guide the planning and development of Zumma’s AI processes and AI agents",
        "Own the technical relationship with clients and partners",
        "Define our engineering processes, the scope of new work and its priorities",
        "Shape where Zumma’s engineering goes next — and build it",
      ],
      tags: ["ai-agents", "leadership", "python", "go"],
    },
    {
      period: "Mar 2023 — Nov 2024 · Mexico City",
      title: "Founding Engineer @ Zumma",
      summary:
        "Joined as the founding backend engineer. Architected and built Zumma’s main product, Facturación de Gastos en Automático (automatic expense invoicing), now serving 100,000+ customers — including the extraction pipeline that pulls the data needed to request and issue each invoice on the merchant’s portal.",
      tags: ["backend", "python", "go", "data-extraction"],
    },
    {
      period: "Mar 2021 — Mar 2023 · Caracas",
      title: "Software Engineer @ asistensi",
      summary:
        "Built the foundational backend and integration services for multi-country operations, including a multi-tenant service that centralized lead data from many sources into customized CRMs across 3+ countries.",
      tags: ["backend", "multi-tenant", "integrations"],
    },
  ],
  education: [
    { period: "2023 — 2026", title: "BSc Computer Science · University of the People" },
    {
      period: "2018 — 2020",
      title: "Associate’s, Computer Software Engineering · IUT Agroindustrial Región Los Andes",
    },
  ],
  origin: "2018 — started studying software engineering",
  toolbox: [
    { label: "languages", value: "Python · Go · JavaScript" },
    { label: "ai · models", value: "Gemini (Vertex AI) · OpenAI · Anthropic" },
    { label: "ai · tooling", value: "Langfuse · LiteLLM · Instructor" },
    { label: "data", value: "PostgreSQL · Qdrant" },
    { label: "infra", value: "Terraform · AWS · GCP" },
    { label: "integrations", value: "WhatsApp API" },
    { label: "realtime", value: "WebRTC" },
    { label: "certified", value: "AWS Cloud Quest: Cloud Practitioner" },
  ],
  principles: [
    {
      title: "Own it end to end",
      body: "From the first prototype to the system running in production — I like being responsible for the whole thing.",
    },
    {
      title: "Break things on purpose",
      body: "Experimenting and messing things around is how I get better. This site is the proof — it’s my sandbox.",
    },
    {
      title: "Write it down",
      body: "If I learned it, it goes in the log so it sticks — for me and for whoever hits the same wall.",
    },
  ],
  offTheClock:
    "[A few lines that aren’t about code — hobbies, places, what you’re reading.]",
  cvUrl: "",
  photo: roy,
};

export default whoami;
