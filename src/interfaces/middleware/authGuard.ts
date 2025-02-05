import { Request, Response, NextFunction } from 'express';
import { supabase } from '../../infrastructure/third-party/supabase';

export async function authGuard(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { data, error } = await supabase.auth.getSession();

  if (error) {
    res.status(401).json({ message: 'Not Authenticated' });
    return;
  }

  const { data: user, error: userError } = await supabase.auth.getUser();

  if (userError) {
    res.status(401).json({ message: 'Not Authenticated' });
    return;
  }

  req.user = user.user;

  next();
}
