import { User } from '@supabase/supabase-js';

export interface AuthService {
  sendMagicLinkAuth(email: string): Promise<void>;
  verifyHashTokenAuth(token: string): Promise<void>;
  getUserAuth(): Promise<User>;
}
