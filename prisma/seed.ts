import { PrismaClient } from '@prisma/client';
import { hash } from 'bcryptjs';
import 'dotenv/config';

const prisma = new PrismaClient();

async function main() {
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;
  const adminName = process.env.ADMIN_USERNAME || process.env.ADMIN_NAME || 'Admin';

  if (adminEmail && adminPassword) {
    const passwordHash = await hash(adminPassword, 10);
    await prisma.adminUser.upsert({
      where: { email: adminEmail },
      update: { name: adminName, passwordHash },
      create: { name: adminName, email: adminEmail, passwordHash }
    });
  }

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
