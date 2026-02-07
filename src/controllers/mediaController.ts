import { Request, Response } from "express";
import { getMediaList } from "../services/mediaService";

export async function listMedia(_req: Request, res: Response) {
  const items = await getMediaList();
  res.json(items);
}
