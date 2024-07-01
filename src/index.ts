import { Hono } from "hono";
import { appendFile } from "fs/promises";

const app = new Hono();

app.all("*", async (c) => {
  const { method, url } = c.req;
  const date = new Date().toLocaleString();
  let request: unknown;

  if (c.req.header("content-type")?.startsWith("application/json")) {
    const data = await c.req.json();
    request = { date, method, url, data };
  } else {
    const text = await c.req.text();
    request = { date, method, url, text };
  }

  console.log(request);
  await appendFile("log.jsonl", JSON.stringify(request) + "\n");

  return new Response("thanks", { status: 201 });
});

export default app;
