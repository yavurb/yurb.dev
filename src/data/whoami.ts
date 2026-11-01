/**
 * Content for /whoami and the home teaser.
 * Everything in [brackets] is a placeholder — replace it with the real thing.
 */

type Role = {
  period: string; // e.g. "2023 — now"
  title: string; // e.g. "Backend Engineer @ Acme"
  summary: string;
  tags: string[];
};

type Whoami = {
  intro: string;
  codingSince: string;
  current: string;
  facts: { label: string; value: string }[];
  now: { label: string; value: string }[];
  roles: Role[];
  education?: { period: string; title: string };
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
    "Backend developer. I build the parts of software you don’t see — and write down what I learn doing it.",
  codingSince: "[Year]",
  current: "[Role] @ [Company]",
  facts: [
    { label: "Based in", value: "[City, Country]" },
    { label: "Speaks", value: "[Languages]" },
    { label: "Status", value: "[Open to / Not looking]" },
  ],
  now: [
    { label: "Working on", value: "[Role at Company — one line on what you own there.]" },
    { label: "Building", value: "Rill, Yurback, and this site — [anything else on the bench]." },
    { label: "Learning", value: "[What you’re digging into right now.]" },
  ],
  roles: [
    {
      period: "[Year] — now",
      title: "[Role] @ [Company]",
      summary: "[Two lines: what you built or owned, and the result — scale, latency, cost, team.]",
      tags: ["go", "postgresql", "aws"],
    },
    {
      period: "[Year] — [Year]",
      title: "[Role] @ [Company]",
      summary: "[What you built or owned, and the result.]",
      tags: ["python", "terraform"],
    },
    {
      period: "[Year] — [Year]",
      title: "[Role] @ [Company]",
      summary: "[What you built or owned, and the result.]",
      tags: ["[tag]"],
    },
  ],
  education: { period: "[Year]", title: "[Degree / Program] · [School]" },
  origin: "[Year] — [how it all started, one line]",
  toolbox: [
    { label: "languages", value: "Go · Python" },
    { label: "data", value: "PostgreSQL · [Redis?]" },
    { label: "infra", value: "Terraform · AWS · GCP" },
    { label: "also", value: "WebRTC · Astro" },
  ],
  principles: [
    {
      title: "Break things on purpose",
      body: "Experimenting and messing things around is how I get better. This site is the proof — it’s my sandbox.",
    },
    {
      title: "Write it down",
      body: "If I learned it, it goes in the log so it sticks — for me and for whoever hits the same wall.",
    },
    { title: "[Your third principle]", body: "[One or two lines on it.]" },
  ],
  offTheClock:
    "[A few lines that aren’t about code — hobbies, places, what you’re reading.]",
  cvUrl: "",
  photo: "",
};

export default whoami;
