import { File } from '../../domain/entities/File';
import { FileRepository } from '../../domain/interfaces/FileRepository';

export class DownloadFile {
  constructor(private repository: FileRepository) {}

  async execute(file_path: File['url']) {
    return await this.repository.download(file_path);
  }
}
