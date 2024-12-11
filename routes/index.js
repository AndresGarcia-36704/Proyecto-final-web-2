import express from "express";
import { makeupsFileRouter } from "./makeups.file.router.js";
import { makeupsRouter } from "./makeups.router.js";
import { makeupsViewsRouter } from "./makeups.views.router.js";
import { authRouter } from "./auth.router.js";

export function routerMakeups(app) {
    app.use("/auth", authRouter);

    app.use("/makeups", makeupsViewsRouter);

    const apiRouter = express.Router();
    apiRouter.use("/file/makeups", makeupsFileRouter);
    apiRouter.use("/makeups", makeupsRouter);

    app.use("/api/v1", apiRouter);

    app.use("/", makeupsViewsRouter);
}
