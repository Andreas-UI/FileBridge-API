import { Multer } from 'multer';
import { File } from '../../domain/entities/File';
import { Folder } from '../../domain/entities/Folder';

export interface StorageService {
  upload(folder: Folder, file: Express.Multer.File): Promise<File>;
}
