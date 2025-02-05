import { Request, Response } from 'express';

export class Controller {
  async handleRequest(
    req: Request,
    res: Response,
    action: () => Promise<any>,
  ): Promise<void> {
    try {
      const result = await action();
      res.status(200).json(result);
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : 'An unknown error occurred';
      res.status(500).json({ message });
    }
  }
}
