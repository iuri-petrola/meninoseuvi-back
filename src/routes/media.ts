import { Router } from "express";
import { createMediaItem, listMedia } from "../controllers/mediaController";
import { upload } from "../lib/upload";
import { requireAdmin } from "../middlewares/requireAdmin";

export const mediaRouter = Router();

mediaRouter.get("/", listMedia);
mediaRouter.post("/", requireAdmin, upload.single("image"), createMediaItem);
