import { Request, Response } from 'express';
import { Controller } from './Controller';
import { SendMagicLinkAuth } from '../../application/use-cases/SendMagicLinkAuth';
import { GetUserAuth } from '../../application/use-cases/GetUserAuth';
import { VerifyHashTokenAuth } from '../../application/use-cases/VerifyHashTokenAuth';

export class AuthController extends Controller {
  constructor(
    private sendMagicLinkAuth: SendMagicLinkAuth,
    private getUserAuth: GetUserAuth,
    private verifyHashTokenAuth: VerifyHashTokenAuth,
  ) {
    super();
  }

  async sendMagicLink(req: Request, res: Response) {
    await this.handleRequest(req, res, async () => {
      const { email } = req.body;
      return await this.sendMagicLinkAuth.execute(email);
    });
  }

  async verifyHashToken(req: Request, res: Response) {
    await this.handleRequest(req, res, async () => {
      const { token } = req.query;
      await this.verifyHashTokenAuth
        .execute(token as string)
        .then(() => res.send('Login successful! You can now close this tab.'));
    });
  }

  async getUser(req: Request, res: Response) {
    await this.handleRequest(req, res, async () => {
      return await this.getUserAuth.execute();
    });
  }
}
