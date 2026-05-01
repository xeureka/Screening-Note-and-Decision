import type { Context } from "hono";

/**
 * Permission guard — plug your real JWT/session check here.
 * Bun.env is available anywhere without dotenv imports.
 */
export function requireRecruiter(c: Context): boolean {
    const role = c.req.header("x-user-role");
    return role === "recruiter" || role === "admin";
}
