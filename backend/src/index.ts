import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import hiringRouter from "./routes/hiring";

const app = new Hono();

app.use("*", logger());
app.use(
  "*",
  cors({
    origin: Bun.env.CORS_ORIGIN ?? "http://localhost:5173",
    credentials: true,
    allowMethods: ["GET", "POST", "OPTIONS"],
    allowHeaders: ["Content-Type", "x-user-role"],
  }),
);

app.route("/hiring", hiringRouter);

app.get("/health", (c) => c.json({ ok: true, runtime: "bun" }));

export default {
  port: Number(Bun.env.PORT ?? 3000),
  fetch: app.fetch,
};

console.log(
  `Backend Server running on http://localhost:${Bun.env.PORT ?? 3000}`,
);
