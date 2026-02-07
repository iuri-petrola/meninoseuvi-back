import { Router } from "express";
import { createMediaItem, listMedia } from "../controllers/mediaController";
import { upload } from "../lib/upload";

export const mediaRouter = Router();

mediaRouter.get("/", listMedia);
mediaRouter.post("/", upload.single("image"), createMediaItem);
