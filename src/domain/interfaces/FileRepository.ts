import { File } from '../entities/File';
import { Folder } from '../entities/Folder';

export interface FileRepository {
  findAll(folder: Folder): Promise<File[]>;
  insertOne(folder: Folder, file: Express.Multer.File): Promise<File>;
  insertMany(folder: Folder, files: Express.Multer.File[]): Promise<File[]>;
}
