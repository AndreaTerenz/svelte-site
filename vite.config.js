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
            '~bicons': path.resolve(__dirname, 'node_modules/bootstrap-icons'),
            '#app.css': path.resolve(__dirname, 'src/app.css'),
        }
    },

});
