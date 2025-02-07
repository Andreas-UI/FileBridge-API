import { Folder } from '../../domain/entities/Folder';
import { FileRepository } from '../../domain/interfaces/FileRepository';

export class CreateFiles {
  constructor(private repository: FileRepository) {}

  async execute(folder_id: Folder["id"], files: Express.Multer.File[]) {
    return await this.repository.insertMany(folder_id, files);
  }
}
