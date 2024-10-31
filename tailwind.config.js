/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                primary: {
                    light: "#fdfdfd",
                    dark: "#131718",
                },
                secondary: {
                    light: "#f4f5f7",
                    dark: "#283444",
                },
                gray: {
                    light: "#f4f5f7",
                    dark: "#201b22",
                },
                text: {
                    primary: {
                        light: "#131718",
                        dark: "#f4f5f7",
                    },
                    secondary: {
                        light: "#777777",
                        dark: "#cccccc",
                    },
                    light: {
                        light: "#cccccc",
                        dark: "#777777",
                    },
                },
                appBlue: "#3b82f6",
            },
            backgroundImage: {
                "custom-gradient":
                    "linear-gradient(to bottom, #000000, #151014, #201b22, #262733, #283444, #283444, #283444, #283444, #262733, #201b22, #151014, #000000)",
            },
        },
    },
    darkMode: "class",
    plugins: [],
};
