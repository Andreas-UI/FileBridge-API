import { Request, Response } from 'express';
import { CreateFolder } from '../../application/use-cases/CreateFolder';
import { FindAllFolder } from '../../application/use-cases/FindAllFolder';
import { FindByIdFolder } from '../../application/use-cases/FindByIdFolder';
import { Controller } from './Controller';
import { DeleteFolders } from '../../application/use-cases/DeleteFolders';
import { Tables } from '../../../database.types';

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
    await this.handleRequest(req, res, () => {
      const params = String(req.query.sort_by);
      const sort_by = ['subject', 'created_at'].includes(params)
        ? (params as keyof Tables<'Folder'>)
        : 'subject';
      return this.findAllFolder.execute(sort_by);
    });
  }

  async findById(req: Request, res: Response) {
    await this.handleRequest(req, res, () =>
      this.findByIdFolder.execute(Number(req.query.id)),
    );
  }

  async delete(req: Request, res: Response) {
    await this.handleRequest(req, res, () => {
      const { folder_ids } = req.body;
      try {
        let parsedIds =
          typeof folder_ids === 'string' ? JSON.parse(folder_ids) : folder_ids;
        return this.deleteFolders.execute(parsedIds);
      } catch (error) {
        return this.deleteFolders.execute([]);
      }
    });
  }
}
