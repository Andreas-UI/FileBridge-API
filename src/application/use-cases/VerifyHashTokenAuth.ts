import { AuthService } from '../interfaces/AuthService';

export class VerifyHashTokenAuth {
  constructor(private service: AuthService) {}

  async execute(token: string) {
    return await this.service.verifyHashTokenAuth(token);
  }
}
