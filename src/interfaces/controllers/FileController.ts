import { Request, Response } from 'express';
import { CreateFiles } from '../../application/use-cases/CreateFiles';
import { Controller } from './Controller';

export class FileController extends Controller {
  constructor(private createFiles: CreateFiles) {
    super();
  }

  async create(req: Request, res: Response) {
    await this.handleRequest(req, res, async () => {
      const { folder } = req.body;
      const files = req.files as Express.Multer.File[];
      return await this.createFiles.execute(JSON.parse(folder), files);
    });
  }
}
