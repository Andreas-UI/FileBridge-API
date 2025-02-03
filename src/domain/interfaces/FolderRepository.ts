import { Folder, FolderInput } from "../entities/Folder";

export interface FolderRepository {
  findAll(): Promise<Folder[]>;
  findById(id: number): Promise<Folder | null>;
  insertOne(folder: FolderInput): Promise<Folder>;
  updateOne(folder: Folder): Promise<void>;
  deleteMany(ids: number[]): Promise<void>;
}
