/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{vue,js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                serif: ['Playfair Display', 'serif'],
            },
            colors: {
                'brand-light': '#f4fbf6',
                'brand-soft': '#e6f5ea',
                'brand-primary': '#2e7d32',
                'brand-dark': '#1b5e20',
            }
        },
    },
    plugins: [],
}