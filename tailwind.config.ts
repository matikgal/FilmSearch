/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			colors: {
				primary: '#6a2a98', // Główny fioletowy
				secondary: '#ff3d94', // Różowy akcent
				background: '#210b4b', // Ciemne tło
				accent: '#3f1c6d', // Ciemniejszy fiolet
			},
		},
	},
	plugins: [],
}
