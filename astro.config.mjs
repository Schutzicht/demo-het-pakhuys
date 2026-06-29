import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  site: "https://demo-het-pakhuys.vercel.app",
  vite: {
    plugins: [tailwindcss()],
  },
});
