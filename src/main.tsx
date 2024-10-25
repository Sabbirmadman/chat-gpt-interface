import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";

async function prepareApp() {
    if (process.env.NODE_ENV === "development") {
        const { worker } = await import("./mocks/browser");
        await worker.start({
            onUnhandledRequest: "bypass",
            serviceWorker: {
                url: "/mockServiceWorker.js",
            },
        });
    }
}

prepareApp().then(() => {
    ReactDOM.createRoot(document.getElementById("root")!).render(
        // <React.StrictMode>
        <BrowserRouter>
            <App />
        </BrowserRouter>

        // </React.StrictMode>
    );
});
