import { File } from '../../domain/entities/File';
import { Folder } from '../../domain/entities/Folder';

export interface StorageService {
  upload(folder_id: Folder['id'], file: Express.Multer.File): Promise<File>;
  delete(file_paths: string[]): Promise<void>;
}
