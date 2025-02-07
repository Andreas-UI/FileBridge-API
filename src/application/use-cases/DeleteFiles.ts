import { File } from '../../domain/entities/File';
import { Folder } from '../../domain/entities/Folder';
import { FileRepository } from '../../domain/interfaces/FileRepository';

export class DeleteFiles {
  constructor(private repository: FileRepository) {}

  async execute(folder_id: Folder['id'], file_ids: File['id'][]) {
    return await this.repository.deleteMany(folder_id, file_ids);
  }
}
