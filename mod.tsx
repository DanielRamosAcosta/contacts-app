import React from 'https://esm.sh/react'
import { renderToString } from 'https://esm.sh/react-dom/server'
import { App } from "./index.tsx";

const h = React.createElement

addEventListener("fetch", (event) => {
  // renderToString generates html string from JSX components.
  const response = new Response(renderToString(<App />), {
    headers: { "content-type": "text/html; charset=utf-8" },
  });

  event.respondWith(response);
});
