import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
const path = require('path')

export default defineConfig({
    plugins: [
        tailwindcss(),
        sveltekit()
    ],
    resolve: {
        alias: {
            '#app.css': path.resolve(import.meta.dirname, 'src/app.css'),
            "@": path.resolve(import.meta.dirname, "src"),
        }
    }
});
