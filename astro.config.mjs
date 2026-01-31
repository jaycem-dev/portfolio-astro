import { defineConfig } from "astro/config";
import vercel from "@astrojs/vercel";
import sitemap from "@astrojs/sitemap";
import { transformerNotationDiff } from "@shikijs/transformers";
import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
    site: "https://www.jaycem.dev",
    adapter: vercel(),
    markdown: {
        shikiConfig: {
            theme: "catppuccin-mocha",
            // Enable word wrap to prevent horizontal scrolling
            wrap: true,
            transformers: [transformerNotationDiff()],
        },
    },
    integrations: [sitemap()],
    experimental: {},
    vite: {
        plugins: [tailwindcss()],
    },
});
