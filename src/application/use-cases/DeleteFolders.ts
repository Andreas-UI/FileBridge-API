import { Folder } from '../../domain/entities/Folder';
import { FolderRepository } from '../../domain/interfaces/FolderRepository';

export class DeleteFolders {
  constructor(private repository: FolderRepository) {}

  async execute(folder_ids: Folder['id'][]) {
    return await this.repository.deleteMany(folder_ids);
  }
}
