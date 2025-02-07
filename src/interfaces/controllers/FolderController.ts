import { Request, Response } from 'express';
import { CreateFolder } from '../../application/use-cases/CreateFolder';
import { FindAllFolder } from '../../application/use-cases/FindAllFolder';
import { FindByIdFolder } from '../../application/use-cases/FindByIdFolder';
import { Controller } from './Controller';
import { DeleteFolders } from '../../application/use-cases/DeleteFolders';

export class FolderController extends Controller {
  constructor(
    private createFolder: CreateFolder,
    private findAllFolder: FindAllFolder,
    private findByIdFolder: FindByIdFolder,
    private deleteFolders: DeleteFolders,
  ) {
    super();
  }

  async create(req: Request, res: Response) {
    await this.handleRequest(req, res, () => {
      const folder = req.body;
      return this.createFolder.execute(folder);
    });
  }

  async findAll(req: Request, res: Response) {
    await this.handleRequest(req, res, () => this.findAllFolder.execute());
  }

  async findById(req: Request, res: Response) {
    await this.handleRequest(req, res, () =>
      this.findByIdFolder.execute(Number(req.query.id)),
    );
  }

  async delete(req: Request, res: Response) {
    await this.handleRequest(req, res, () => {
      const { folder_ids } = req.body;
      return this.deleteFolders.execute(JSON.parse(folder_ids));
    });
  }
}
