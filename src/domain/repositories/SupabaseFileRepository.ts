import { SupabaseStorageService } from '../../application/services/SupabaseStorageService';
import { supabase } from '../../infrastructure/third-party/supabase';
import { File } from '../entities/File';
import { Folder } from '../entities/Folder';
import { FileRepository } from '../interfaces/FileRepository';

export class SupabaseFileRepository implements FileRepository {
  private supabaseStorageService = new SupabaseStorageService();

  findAll(folder: Folder): Promise<File[]> {
    throw new Error('Method not implemented.');
  }

  async deleteMany(
    folder_id: Folder['id'],
    file_ids: File['id'][],
  ): Promise<void> {
    const {
      data: files,
      error: filesSelectError,
      status: filesSelectErrorStatus,
      statusText: filesSelectErrorStatusText,
    } = await supabase.from('File').select().in('id', file_ids);
    if (filesSelectError)
      throw new Error(
        `${filesSelectErrorStatus}:${filesSelectErrorStatusText} - ${filesSelectError.message}`,
      );

    const {
      error: filesDeleteError,
      status: filesDeleteErrorStatus,
      statusText: filesDeleteErrorStatusText,
    } = await supabase.from('File').delete().in('id', file_ids);
    if (filesDeleteError)
      throw new Error(
        `${filesDeleteErrorStatus}:${filesDeleteErrorStatusText} - ${filesDeleteError.message}`,
      );

    const file_paths = files.map((file) => `${file.name}`);

    if (file_paths.length > 0)
      await this.supabaseStorageService.delete(file_paths);
  }

  // TODO:: May be redundant. Consider to be removed in the future.
  async insertOne(
    folder_id: Folder['id'],
    file: Express.Multer.File,
  ): Promise<File> {
    return await this.supabaseStorageService.upload(folder_id, file);
  }

  async insertMany(
    folder_id: Folder['id'],
    files: Express.Multer.File[],
  ): Promise<File[]> {
    return await Promise.all(
      files.map((file) => this.supabaseStorageService.upload(folder_id, file)),
    );
  }
}
