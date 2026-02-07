import { Request, Response } from "express";
import { createMedia, getMediaList } from "../services/mediaService";

export async function listMedia(_req: Request, res: Response) {
  const items = await getMediaList();
  res.json(items);
}

export async function createMediaItem(req: Request, res: Response) {
  const { title, imageUrl, audioBase64, audioMimeType } = req.body;

  if (!title || !imageUrl || !audioBase64 || !audioMimeType) {
    return res.status(400).json({
      error: 'Campos obrigatorios: title, imageUrl, audioBase64, audioMimeType'
    });
  }

  try {
    const created = await createMedia({
      title,
      imageUrl,
      audioBase64,
      audioMimeType
    });
    return res.status(201).json(created);
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao criar midia' });
  }
}
