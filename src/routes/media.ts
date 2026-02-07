import { Router } from "express";
import { createMediaItem, listMedia } from "../controllers/mediaController";

export const mediaRouter = Router();

mediaRouter.get("/", listMedia);
mediaRouter.post("/", createMediaItem);
