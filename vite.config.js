import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "tailwindcss";
import tailwindcssNesting from "tailwindcss/nesting/index.js";
import autoprefixer from "autoprefixer";

// https://vitejs.dev/config/
export default defineConfig({
  // css: {
  //   postcss: {
  //     plugins: [tailwindcssNesting, tailwindcss, autoprefixer],
  //     // syntax: "postcss-scss",
  //   },
  // },
  plugins: [react()],
});

