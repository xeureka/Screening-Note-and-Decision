import { Hono } from "hono";
import screeningRouter from "./screening";

const hiringRouter = new Hono();

hiringRouter.route("/application/screening", screeningRouter);

export default hiringRouter;
