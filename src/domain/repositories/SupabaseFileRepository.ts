import { SupabaseStorageService } from '../../application/services/SupabaseStorageService';
import { File, FileInput } from '../entities/File';
import { Folder } from '../entities/Folder';
import { FileRepository } from '../interfaces/FileRepository';

export class SupabaseFileRepository implements FileRepository {
  private supabaseStorageService = new SupabaseStorageService();

  findAll(folder: Folder): Promise<File[]> {
    throw new Error('Method not implemented.');
  }

  // TODO:: May be redundant. Consider to be removed in the future.
  async insertOne(folder: Folder, file: Express.Multer.File): Promise<File> {
    return await this.supabaseStorageService.upload(folder, file);
  }

  async insertMany(
    folder: Folder,
    files: Express.Multer.File[],
  ): Promise<File[]> {
    return await Promise.all(
      files.map((file) => this.supabaseStorageService.upload(folder, file)),
    );
  }
}
