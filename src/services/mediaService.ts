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
