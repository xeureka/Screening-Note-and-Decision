import { eq } from "drizzle-orm";
import type { Context } from "hono";
import { db } from "../../../db";
import { screeningDecisions } from "../../../db/schema/screening-decision";
import { requireRecruiter } from "../../../lib/permissions";
import { decisionBodySchema } from "./decision.schema";

// ─── GET /hiring/application/screening/:stageId/decision ─────────────────────
export async function getScreeningDecision(c: Context) {
    if (!requireRecruiter(c)) {
        return c.json({ error: "Forbidden" }, 403);
    }

    const stageId = c.req.param("stageId");

    const [row] = await db
        .select({
            decision: screeningDecisions.decision,
            note: screeningDecisions.note,
            updatedAt: screeningDecisions.updatedAt,
        })
        .from(screeningDecisions)
        .where(eq(screeningDecisions.stageId, stageId))
        .limit(1);

    if (!row) {
        return c.json({ data: null }, 200);
    }

    return c.json({ data: row }, 200);
}

// ─── POST /hiring/application/screening/:stageId/decision ────────────────────
export async function upsertScreeningDecision(c: Context) {
    if (!requireRecruiter(c)) {
        return c.json({ error: "Forbidden" }, 403);
    }

    const stageId = c.req.param("stageId");

    let rawBody: unknown;
    try {
        rawBody = await c.req.json();
    } catch {
        return c.json({ error: "Invalid JSON body" }, 400);
    }

    const parsed = decisionBodySchema.safeParse(rawBody);
    if (!parsed.success) {
        return c.json(
            {
                error: "Validation failed",
                issues: parsed.error.flatten().fieldErrors,
            },
            422,
        );
    }

    const { decision, note } = parsed.data;
    const now = new Date();

    const [row] = await db
        .insert(screeningDecisions)
        .values({
            stageId,
            decision,
            note: note ?? null,
            updatedAt: now,
        })
        .onConflictDoUpdate({
            target: screeningDecisions.stageId,
            set: {
                decision,
                note: note ?? null,
                updatedAt: now,
            },
        })
        .returning({
            decision: screeningDecisions.decision,
            note: screeningDecisions.note,
            updatedAt: screeningDecisions.updatedAt,
        });

    return c.json({ data: row }, 200);
}
