import express from "express";
import { accessoriesFileRouter } from "./productsFileRouter.js";
import { accessoriesRouter } from "./productsRouter.js";
import { accessoriesViewsRouter } from "./productsViewsRouter.js";
import { authRouter } from "./auth.router.js";

export function routerAccessories(app) {
    app.use("/auth", authRouter);

    app.use("/accessories", accessoriesViewsRouter);

    const apiRouter = express.Router();
    apiRouter.use("/file/accessories", accessoriesFileRouter);
    apiRouter.use("/accessories", accessoriesRouter);

    app.use("/api/v1", apiRouter);

    app.use("/", accessoriesViewsRouter);
}
