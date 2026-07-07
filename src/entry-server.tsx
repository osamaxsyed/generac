import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { Helmet } from "react-helmet";
import { AppProviders, AppRoutes } from "./App";

// Called by scripts/prerender.js for every route at build time. Returns the
// full app HTML for that URL so the prerendered pages ship real content
// instead of an empty #root shell.
export function render(url: string): string {
  const html = renderToString(
    <AppProviders>
      <StaticRouter location={url}>
        <AppRoutes />
      </StaticRouter>
    </AppProviders>
  );
  // react-helmet accumulates head state per render; flush it so back-to-back
  // renders in the prerender loop don't leak into each other.
  Helmet.renderStatic();
  return html;
}
