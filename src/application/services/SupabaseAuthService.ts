import { supabase } from '../../infrastructure/third-party/supabase';
import { AuthService } from '../interfaces/AuthService';

export class SupabaseAuthService implements AuthService {
  async sendMagicLinkAuth(email: string) {
    const { error } = await supabase.auth.signInWithOtp({
      email: email,
      options: {
        emailRedirectTo: `${process.env.PROJECT_URL}/auth/callback`
      }
    });
    if (error) throw new Error(error.message);
  }

  async verifyHashTokenAuth(token: string) {
    const { data, error } = await supabase.auth.verifyOtp({
      token_hash: token,
      type: 'email',
    });

    if (error) throw new Error(error.message);

    if (data.session) {
      await supabase.auth.setSession({
        access_token: data.session.access_token,
        refresh_token: data.session.refresh_token,
      });
    } else {
      throw new Error('No Session Established!');
    }
  }

  async getUserAuth() {
    const { data, error } = await supabase.auth.getUser();
    if (error) throw new Error(error.message);
    return data.user;
  }
}
