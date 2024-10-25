/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                primary: "var(--color-primary)",
                secondary: "var(--color-secondary)",
                gray: "var(--color-gray)",
                primaryDark: "var(--color-primary-dark)",
                textPrimary: "var(--color-text-primary)",
                textSecondary: "var(--color-text-secondary)",
                textLight: "var(--color-text-light)",

                appBlue: "var(--appBlue)",
            },
            backgroundImage: {
                "custom-gradient":
                    "linear-gradient(to bottom, #000000, #151014, #201b22, #262733, #283444, #283444, #283444, #283444, #262733, #201b22, #151014, #000000)",
            },
        },
    },
    plugins: [],
};
