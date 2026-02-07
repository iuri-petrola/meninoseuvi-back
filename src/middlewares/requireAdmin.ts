import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

type TokenPayload = {
  sub: string;
  role: 'admin';
};

declare module 'express' {
  interface Request {
    adminId?: string;
  }
}

export function requireAdmin(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: 'Token nao enviado' });
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || '') as TokenPayload;

    if (decoded.role !== 'admin') {
      return res.status(403).json({ error: 'Acesso restrito' });
    }

    req.adminId = decoded.sub;
    return next();
  } catch (error) {
    return res.status(401).json({ error: 'Token invalido' });
  }
}
