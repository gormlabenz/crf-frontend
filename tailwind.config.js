module.exports = {
    purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx,css}'],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            fontFamily: {
                sans: ['Space Grotesk', 'Garamond', 'sans-serif'],
            },
            colors: {
                black: {
                    DEFAULT: '#151515',
                    50: '#888888',
                    100: '#7B7B7B',
                    200: '#626262',
                    300: '#484848',
                    400: '#2F2F2F',
                    500: '#151515',
                },
                signal: {
                    DEFAULT: '#F74100',
                    50: '#FFE6DE',
                    100: '#FFD4C4',
                    200: '#FFAE91',
                    300: '#FF885E',
                    400: '#FF632B',
                    500: '#F74100',
                    600: '#C43400',
                    700: '#912600',
                    800: '#5E1900',
                    900: '#2B0B00',
                },
            },
        },
    },
    variants: {
        extend: {},
    },
    plugins: [require('tailwindcss-text-fill-stroke')()],
}
