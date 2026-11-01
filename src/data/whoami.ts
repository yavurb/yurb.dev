/**
 * Content for /whoami and the home teaser.
 * Filled from Roy's LinkedIn profile. Anything still in [brackets] wasn't
 * in the profile — replace it with the real thing.
 */

type Role = {
  period: string; // e.g. "Mar 2023 — now · Mexico City"
  title: string; // e.g. "Head of Engineering @ Zumma"
  summary: string;
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
  /** Image in /public (e.g. "/roy.webp"). Empty shows a placeholder frame. */
  photo: string;
};

const whoami: Whoami = {
  intro:
    "Head of Engineering and backend engineer. I build AI-powered fintech products end to end — from early prototypes to production systems.",
  since: { label: "Shipping to production since", value: "2021" },
  current: "Head of Engineering @ Zumma",
  facts: [
    { label: "Name", value: "Royner Perez" },
    { label: "Based in", value: "Mexico City" },
    { label: "Speaks", value: "[Languages]" },
    { label: "Status", value: "[Open to / Not looking]" },
  ],
  now: [
    {
      label: "Working on",
      value: "Leading engineering at Zumma — AI agents that automate financial workflows.",
    },
    { label: "Building", value: "Rill, Yurback, and this site — [anything else on the bench]." },
    { label: "Studying", value: "Wrapping up a BSc in Computer Science at University of the People." },
  ],
  roles: [
    {
      period: "Mar 2023 — now · Mexico City",
      title: "Head of Engineering @ Zumma",
      summary:
        "Founding engineer. Built Mexico’s first automated invoicing AI agent, architected scalable AI expense management for 100,000+ customers, and designed an image-processing pipeline for critical data extraction.",
      tags: ["python", "go", "ai-agents", "whatsapp-api"],
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
    { label: "ai", value: "AI agents · WhatsApp API" },
    { label: "data", value: "PostgreSQL" },
    { label: "infra", value: "Terraform · AWS · GCP" },
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
  photo: "",
};

export default whoami;
