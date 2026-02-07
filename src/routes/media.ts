import { Router } from "express";
import { listMedia } from "../controllers/mediaController";

export const mediaRouter = Router();

mediaRouter.get("/", listMedia);
