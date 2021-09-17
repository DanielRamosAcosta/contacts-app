import React from 'https://esm.sh/react'
import { renderToString } from 'https://esm.sh/react-dom/server'
import { App } from "./index.tsx";

// Start listening on port 8080 of localhost.
const server = Deno.listen({ port: 8080 });
console.log(`HTTP webserver running.  Access it at:  http://localhost:8080/`);

for await (const conn of server) {
  serveHttp(conn);
}

async function serveHttp(conn: Deno.Conn) {
  const httpConn = Deno.serveHttp(conn);
  for await (const requestEvent of httpConn) {
    requestEvent.respondWith(
      new Response(renderToString(<App/>), {
        status: 200,
        headers: {
            "content-type": "text/html; charset=utf-8"
        }
      }),
    );
  }
}