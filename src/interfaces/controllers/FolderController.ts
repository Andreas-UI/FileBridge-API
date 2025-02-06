import { Request, Response } from 'express';
import { CreateFolder } from '../../application/use-cases/CreateFolder';
import { FindAllFolder } from '../../application/use-cases/FindAllFolder';
import { FindByIdFolder } from '../../application/use-cases/FindByIdFolder';
import { Controller } from './Controller';

export class FolderController extends Controller {
  constructor(
    private createFolder: CreateFolder,
    private findAllFolder: FindAllFolder,
    private findByIdFolder: FindByIdFolder,
  ) {
    super();
  }

  async create(req: Request, res: Response) {
    await this.handleRequest(req, res, () =>
      this.createFolder.execute(req.body),
    );
  }

  async findAll(req: Request, res: Response) {
    await this.handleRequest(req, res, () => this.findAllFolder.execute());
  }

  async findById(req: Request, res: Response) {
    await this.handleRequest(req, res, () =>
      this.findByIdFolder.execute(Number(req.query.id)),
    );
  }
}
