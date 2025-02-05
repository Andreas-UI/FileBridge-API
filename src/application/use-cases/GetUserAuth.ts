import { AuthService } from '../interfaces/AuthService';

export class GetUserAuth {
  constructor(private service: AuthService) {}

  async execute() {
    return await this.service.getUserAuth();
  }
}
