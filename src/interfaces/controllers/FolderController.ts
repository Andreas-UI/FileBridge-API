import { Request, Response } from 'express';
import { CreateFolder } from '../../application/use-cases/CreateFolder';
import { FindAllFolder } from '../../application/use-cases/FindAllFolder';
import { FindByIdFolder } from '../../application/use-cases/FindByIdFolder';

export class FolderController {
  constructor(
    private createFolder: CreateFolder,
    private findAllFolder: FindAllFolder,
    private findByIdFolder: FindByIdFolder,
  ) {}

  private async handleRequest(
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

  async create(req: Request, res: Response): Promise<void> {
    await this.handleRequest(req, res, () =>
      this.createFolder.execute(req.body),
    );
  }

  async findAll(req: Request, res: Response): Promise<void> {
    await this.handleRequest(req, res, () => this.findAllFolder.execute());
  }

  async findById(req: Request, res: Response): Promise<void> {
    await this.handleRequest(req, res, () =>
      this.findByIdFolder.execute(Number(req.query.id)),
    );
  }
}
