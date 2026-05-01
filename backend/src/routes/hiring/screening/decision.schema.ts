import { z } from "zod";

export const decisionBodySchema = z.object({
    decision: z.enum(["pass", "hold", "reject"], {
        errorMap: () => ({
            message: "decision must be one of: pass, hold, reject",
        }),
    }),
    note: z
        .string()
        .max(1000, "note must not exceed 1000 characters")
        .optional(),
});

export type DecisionBody = z.infer<typeof decisionBodySchema>;
