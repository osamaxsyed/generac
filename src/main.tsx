import { createRoot, hydrateRoot } from "react-dom/client";
import { Analytics } from "@vercel/analytics/react";
import App from "./App.tsx";
import "./index.css";

const rootEl = document.getElementById("root")!;
const app = (
  <>
    <App />
    <Analytics />
  </>
);

// Prerendered pages ship server-rendered HTML inside #root; hydrate it so
// React attaches to the existing DOM instead of re-rendering from scratch.
if (rootEl.hasChildNodes()) {
  hydrateRoot(rootEl, app);
} else {
  createRoot(rootEl).render(app);
}
