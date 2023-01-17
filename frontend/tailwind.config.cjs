/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				dark: "#1B1B1B",
				"dark-10": "#272727",
				"dark-20": "#1F1F1F",
				"dark-30": "#333333",
			},
		},
	},
	plugins: [
		require("@tailwindcss/line-clamp"),
		require("@tailwindcss/forms"),
		require("@tailwindcss/typography"),
	],
};
