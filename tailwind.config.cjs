const defaultTheme = require("tailwindcss/defaultTheme");

const token = (name) => `rgb(var(--${name}) / <alpha-value>)`;

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        bg: token("bg"),
        fg: token("fg"),
        muted: token("muted"),
        rule: token("rule"),
        surface: token("surface"),
        "inline-code": token("inline-code"),
        "code-bg": token("code-bg"),
        "code-fg": token("code-fg"),
        "code-muted": token("code-muted"),
        "code-border": token("code-border"),
        accent: token("accent"),
        "on-accent": token("on-accent"),
      },
      fontFamily: {
        sans: ["Archivo Variable", ...defaultTheme.fontFamily.sans],
        mono: ["JetBrains Mono", ...defaultTheme.fontFamily.mono],
      },
      maxWidth: {
        site: "1200px",
      },
    },
  },
  plugins: [],
};
