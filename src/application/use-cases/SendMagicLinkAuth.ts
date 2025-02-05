import { AuthService } from '../interfaces/AuthService';

export class SendMagicLinkAuth {
  constructor(private service: AuthService) {}

  async execute(email: string) {
    return await this.service.sendMagicLinkAuth(email);
  }
}
