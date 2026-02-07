import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.mediaItem.deleteMany();

  await prisma.mediaItem.createMany({
    data: [
      {
        title: 'Historia 1',
        imageUrl: 'https://picsum.photos/seed/meninos1/800/600',
        audioBase64: 'BASE64_AUDIO_AQUI',
        audioMimeType: 'audio/mpeg'
      },
      {
        title: 'Historia 2',
        imageUrl: 'https://picsum.photos/seed/meninos2/800/600',
        audioBase64: 'BASE64_AUDIO_AQUI',
        audioMimeType: 'audio/mpeg'
      }
    ]
  });
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
