import { pgTable, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

export const screeningDecisions = pgTable("screening_decisions", {
    id: uuid("id").defaultRandom().primaryKey(),
    stageId: varchar("stage_id", { length: 255 }).notNull().unique(),
    decision: varchar("decision", { length: 20 }).notNull(), // pass | hold | reject
    note: text("note"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export type ScreeningDecision = typeof screeningDecisions.$inferSelect;
export type NewScreeningDecision = typeof screeningDecisions.$inferInsert;
