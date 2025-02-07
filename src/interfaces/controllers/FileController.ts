import { Request, Response } from 'express';
import { CreateFiles } from '../../application/use-cases/CreateFiles';
import { Controller } from './Controller';
import { DeleteFiles } from '../../application/use-cases/DeleteFiles';

export class FileController extends Controller {
  constructor(
    private createFiles: CreateFiles,
    private deleteFiles: DeleteFiles,
  ) {
    super();
  }

  async create(req: Request, res: Response) {
    await this.handleRequest(req, res, async () => {
      const { folder_id } = req.body;
      const files = req.files as Express.Multer.File[];
      return await this.createFiles.execute(folder_id, files);
    });
  }

  async delete(req: Request, res: Response) {
    await this.handleRequest(req, res, async () => {
      const { folder_id, file_ids } = req.body;
      return await this.deleteFiles.execute(folder_id, JSON.parse(file_ids));
    });
  }
}
