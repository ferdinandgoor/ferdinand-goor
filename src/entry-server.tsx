import React from "react";
import { renderToString } from "react-dom/server";
import {
  createStaticHandler,
  createStaticRouter,
  StaticRouterProvider,
} from "react-router-dom/server";
import { routes } from "./router";
export { absoluteUrl, filmSeoRoutes, getSeoData, getStructuredData, siteConfig } from "./seo";

export async function render(url: string) {
  const { query, dataRoutes } = createStaticHandler(routes);
  const request = new Request(new URL(url, "https://prerender.local"));
  const context = await query(request);

  if (context instanceof Response) {
    throw new Error(
      `Cannot prerender ${url}: router returned ${context.status} ${context.statusText}.`,
    );
  }

  const router = createStaticRouter(dataRoutes, context);
  return renderToString(
    <React.StrictMode>
      <StaticRouterProvider router={router} context={context} />
    </React.StrictMode>,
  );
}
