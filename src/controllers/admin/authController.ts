import { Request, Response } from 'express';
import { loginAdmin } from '../../services/admin/authService';

export async function login(req: Request, res: Response) {
  const { name, password } = req.body;

  if (!name || !password) {
    return res.status(400).json({ error: 'name e password sao obrigatorios' });
  }

  try {
    const result = await loginAdmin({ name, password });
    return res.json(result);
  } catch (error) {
    return res.status(401).json({ error: 'Credenciais invalidas' });
  }
}
