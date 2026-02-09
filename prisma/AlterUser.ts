import { PrismaClient } from '@prisma/client';
import { hash } from 'bcryptjs';
import 'dotenv/config';
import readline from 'readline';

const prisma = new PrismaClient();

async function main() {
  const hasTty = !!process.stdin.isTTY;

  let adminName = process.env.ADMIN_USERNAME || '';
  let adminEmail = process.env.ADMIN_EMAIL || '';
  let adminPassword = process.env.ADMIN_PASSWORD || '';

  if (!adminName || !adminEmail || !adminPassword) {
    if (!hasTty) {
      throw new Error(
        'Seed sem TTY. Defina ADMIN_USERNAME, ADMIN_EMAIL e ADMIN_PASSWORD no ambiente para rodar.'
      );
    }

    adminName = adminName || await ask('Admin username: ');
    adminEmail = adminEmail || await ask('Admin email: ');
    adminPassword = adminPassword || await ask('Admin password: ');
  }

  if (adminName && adminEmail && adminPassword) {
    const passwordHash = await hash(adminPassword, 10);
    await prisma.adminUser.upsert({
      where: { name: adminName },
      update: { email: adminEmail, passwordHash },
      create: { name: adminName, email: adminEmail, passwordHash }
    });
  }

}

const rl = process.stdin.isTTY
  ? readline.createInterface({
      input: process.stdin,
      output: process.stdout
    })
  : null;

function ask(question: string): Promise<string> {
  return new Promise((resolve) => {
    if (!rl) {
      resolve('');
      return;
    }
    rl.question(question, (answer) => {
      resolve(answer.trim());
    });
  });
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  })
  .finally(() => {
    rl?.close();
  });

process.on('exit', () => {
  rl?.close();
});

process.on('SIGINT', () => {
  rl?.close();
  process.exit(0);
});
