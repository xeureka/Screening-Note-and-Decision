import type { Context } from "hono";

export function requireRecruiter(c: Context): boolean {
  const role = c.req.header("x-user-role");
  return role === "recruiter" || role === "admin";
}
