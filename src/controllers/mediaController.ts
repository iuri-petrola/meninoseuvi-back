import { Request, Response } from "express";
import { createMedia, getMediaList } from "../services/mediaService";

export async function listMedia(req: Request, res: Response) {
  const items = await getMediaList();
  const host = `${req.protocol}://${req.get('host')}`;
  const normalized = items.map((item) => ({
    ...item,
    imageUrl: item.imageUrl.startsWith('/') ? `${host}${item.imageUrl}` : item.imageUrl
  }));
  res.json(normalized);
}

export async function createMediaItem(req: Request, res: Response) {
  const { title, imageUrl, audioBase64, audioMimeType } = req.body;
  const file = req.file;

  if (!title || !audioBase64 || !audioMimeType) {
    return res.status(400).json({
      error: 'Campos obrigatorios: title, audioBase64, audioMimeType'
    });
  }

  if (!file && !imageUrl) {
    return res.status(400).json({
      error: 'Envie a imagem no campo image ou informe imageUrl'
    });
  }

  const uploadsPublicPath = process.env.UPLOADS_PUBLIC_PATH || '/files';
  const finalImageUrl = file ? `${uploadsPublicPath}/${file.filename}` : imageUrl;

  try {
    const created = await createMedia({
      title,
      imageUrl: finalImageUrl,
      audioBase64,
      audioMimeType
    });
    return res.status(201).json(created);
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao criar midia' });
  }
}
