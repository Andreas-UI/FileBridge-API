import { Request, Response } from 'express';
import { CreateFolder } from '../../application/use-cases/CreateFolder';
import { FindAllFolder } from '../../application/use-cases/FindAllFolder';

export class FolderController {
  constructor(
    private createFolder: CreateFolder,
    private findAllFolder: FindAllFolder,
  ) {}

  async create(req: Request, res: Response): Promise<void> {
    try {
      const folder = await this.createFolder.execute(req.body);
      res.status(201).json(folder);
    } catch (error) {
      res
        .status(500)
        .json({ message: 'An error occurred while creating the folder' });
    }
  }

  async findAll(req: Request, res: Response): Promise<void> {
    try {
      const folders = await this.findAllFolder.execute();
      res.status(201).json(folders);
    } catch (error) {
      res
        .status(500)
        .json({ message: 'An error occurred while finding folders' });
    }
  }
}
