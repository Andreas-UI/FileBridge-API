import { Folder } from '../../domain/entities/Folder';
import { FileRepository } from '../../domain/interfaces/FileRepository';

export class FindFilesByFolder {
  constructor(private repository: FileRepository) {}

  async execute(folder_id: Folder['id']) {
    return await this.repository.findFilesByFolder(folder_id);
  }
}
