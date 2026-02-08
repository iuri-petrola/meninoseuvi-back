import { prisma } from '../../lib/prisma';
import { compare } from 'bcryptjs';
import jwt from 'jsonwebtoken';

type LoginInput = {
  name: string;
  password: string;
};

export async function loginAdmin({ name, password }: LoginInput) {
  const admin = await prisma.adminUser.findUnique({ where: { name } });

  if (!admin) {
    throw new Error('Invalid credentials');
  }

  const ok = await compare(password, admin.passwordHash);

  if (!ok) {
    throw new Error('Invalid credentials');
  }

  const token = jwt.sign(
    { role: 'admin' },
    process.env.JWT_SECRET || '',
    { subject: admin.id, expiresIn: '30m' }
  );

  return {
    id: admin.id,
    name: admin.name,
    email: admin.email,
    token
  };
}
