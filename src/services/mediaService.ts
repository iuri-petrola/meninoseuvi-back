import { prisma } from '../lib/prisma';

export type MediaItem = {
  id: number;
  title: string;
  imageUrl: string;
  audioBase64: string;
  audioMimeType: string;
};

export async function getMediaList(): Promise<MediaItem[]> {
  return prisma.mediaItem.findMany({
    orderBy: { createdAt: 'desc' }
  });
}

export async function createMedia(input: Omit<MediaItem, 'id'>): Promise<MediaItem> {
  return prisma.mediaItem.create({
    data: {
      title: input.title,
      imageUrl: input.imageUrl,
      audioBase64: input.audioBase64,
      audioMimeType: input.audioMimeType
    }
  });
}
