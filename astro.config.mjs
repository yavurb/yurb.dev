import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";
import nodejs from "@astrojs/node";
import vercel from "@astrojs/vercel";
import { loadEnv } from "vite";

const env = loadEnv(process.env.NODE_ENV ?? "", process.cwd(), "");
const isBuild = process.argv.includes("build");

// https://astro.build/config
export default defineConfig({
  integrations: [sitemap()],
  site: env.SITE_URL,
  markdown: {
    syntaxHighlight: "shiki",
    shikiConfig: {
      theme: "nord",
      wrap: false,
    },
  },
  output: "server",
  adapter: isBuild ? vercel() : nodejs({ mode: "standalone" }),
  vite: {
    plugins: [tailwindcss()],
  },
});
