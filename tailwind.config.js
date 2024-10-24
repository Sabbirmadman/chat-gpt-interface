/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                primary: "#fdfdfd",
                secondary: "#f4f5f7",
                gray: "#ecf0f2",
                primaryDark: "#131718",
                textPrimary: "#333",
                textSecondary: "#777",
                textLight: "#f4f5f7",
            },
            backgroundImage: {
                "custom-gradient":
                    "linear-gradient(to bottom, #000000, #151014, #201b22, #262733, #283444, #283444, #283444, #283444, #262733, #201b22, #151014, #000000)",
            },
        },
    },
    plugins: [],
};
