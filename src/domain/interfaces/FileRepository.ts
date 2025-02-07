import { File } from '../entities/File';
import { Folder } from '../entities/Folder';

export interface FileRepository {
  findAll(folder: Folder): Promise<File[]>;
  insertOne(folder_id: Folder['id'], file: Express.Multer.File): Promise<File>;
  insertMany(
    folder_id: Folder['id'],
    files: Express.Multer.File[],
  ): Promise<File[]>;
  deleteMany(folder_id: Folder['id'], file_ids: File['id'][]): Promise<void>;
}
