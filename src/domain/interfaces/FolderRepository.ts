import { Tables } from '../../../database.types';
import { File } from '../entities/File';
import { Folder, FolderInput } from '../entities/Folder';

export interface FolderRepository {
  findAll(
    sort_by?: keyof Tables<'Folder'>,
  ): Promise<Array<Folder & { file_count: number; files: File[] }>>;
  findById(
    id: number,
  ): Promise<(Folder & { file_count: number; files: File[] }) | null>;
  insertOne(folder: FolderInput): Promise<Folder>;
  updateOne(folder: Folder): Promise<void>;
  deleteMany(ids: Folder['id'][]): Promise<void>;
}
