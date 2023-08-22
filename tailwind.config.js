/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/pages/**/*.{js,ts,jsx,tsx,mdx}", "./src/components/**/*.{js,ts,jsx,tsx,mdx}", "./src/app/**/*.{js,ts,jsx,tsx,mdx}", " ./src/styles/**/*..css"],
	theme: {
		extend: {
			fontFamily: {
				catamaran: ["Catamaran", "sans-serif"],
				montserrat: ["Montserrat", "sans-serif"],
			},

			backgroundImage: {
				"gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
				"gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
			},
		},
		colors: {
			bodyPrimary: "#F0F1F7",
			bodySecondary: "#131E41",
			primaryText: "#333335",
			secondaryText: "#a5a5a5",
			primary: "#8D71DE",
			secondary: "#4BB8E2",
			success: "#60C4A0",
			error: "#DF6455",
			warning: "#F5B849",
			info: "#49B6F5",
			white: "#fff",
			black: "#080808",
		},
	},
	plugins: [],
};
