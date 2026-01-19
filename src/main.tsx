import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";

import "./index.css";
import App from "./App.tsx";
import { Page } from "./components/page.tsx";

const root = document.getElementById("root")!;

ReactDOM.createRoot(root).render(
  <BrowserRouter basename="/blog">
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/:slug" element={<Page />} />
    </Routes>
  </BrowserRouter>,
);
