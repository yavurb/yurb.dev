type Social = {
  label: string;
  link: string;
};

type Presentation = {
  name: string;
  mail: string;
  role: string;
  /** Hero headline — one line per entry; `accent` marks the highlighted line. */
  headline: { text: string; accent?: boolean }[];
  intro: string;
  sandbox: string;
  stack: { label: string; value: string }[];
  socials: Social[];
  /** Static entries at the bottom of the home log (oldest last). */
  milestones: { date: string; title: string; description: string; tags: string[] }[];
};

const presentation: Presentation = {
  name: "Roy",
  mail: "yavurb@gmail.com",
  role: "Head of Engineering · backend engineer",
  headline: [
    { text: "I build" },
    { text: "what you", accent: true },
    { text: "don’t see" },
  ],
  intro:
    "Head of Engineering at Zumma, building AI agents for finance. Everything I ship, break and learn lands in the log below.",
  sandbox:
    "This site is my sandbox — expect experiments and the odd bug, on purpose.",
  stack: [
    { label: "Stack", value: "Go · Python · PostgreSQL" },
    { label: "Infra", value: "Terraform · AWS · GCP" },
  ],
  socials: [
    { label: "GitHub", link: "https://github.com/yavurb" },
    { label: "X", link: "https://x.com/yurb_" },
    { label: "Bento", link: "https://bento.me/yurb" },
  ],
  milestones: [
    {
      // TODO(roy): confirm the real launch date — this is a placeholder.
      date: "2023-10-26",
      title: "yurb.dev v1",
      description: "The sandbox opens on Astro. Bugs included.",
      tags: ["astro"],
    },
  ],
};

export default presentation;
