import "./App.css";
import AboutPage from "./pages/AboutPage";
import ChatPage from "./pages/ChatPage";
import HomePage from "./pages/HomePage";
import { Routes, Route } from "react-router-dom";

function App() {
    document.documentElement.classList.add("light");
    return (
        <div>
            <Routes>
                <Route path="/" element={<ChatPage />} />
                <Route path="/home" element={<HomePage />} />
                <Route path="/about" element={<AboutPage />} />
            </Routes>
        </div>
    );
}

export default App;
