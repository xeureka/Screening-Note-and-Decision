import { Hono } from "hono";
import {
    getScreeningDecision,
    upsertScreeningDecision,
} from "./decision.handler";

const screeningRouter = new Hono();

screeningRouter.get("/:stageId/decision", getScreeningDecision);
screeningRouter.post("/:stageId/decision", upsertScreeningDecision);

export default screeningRouter;
