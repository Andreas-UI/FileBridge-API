import { File } from '../../domain/entities/File';
import { FileRepository } from '../../domain/interfaces/FileRepository';

export class DeleteFiles {
  constructor(private repository: FileRepository) {}

  async execute(file_ids: File['id'][]) {
    return await this.repository.deleteMany(file_ids);
  }
}
