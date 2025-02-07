import { SupabaseStorageService } from '../../application/services/SupabaseStorageService';
import { supabase } from '../../infrastructure/third-party/supabase';
import { Folder, FolderInput } from '../entities/Folder';
import { FolderRepository } from '../interfaces/FolderRepository';

export class SupabaseFolderRepository implements FolderRepository {
  private supabaseStorageService = new SupabaseStorageService();

  async findAll() {
    const { data, error, status, statusText } = await supabase
      .from('Folder')
      .select();
    if (error) throw new Error(`${status}:${statusText} - ${error.message}`);
    return data;
  }

  async findById(id: number) {
    const { data, error, status, statusText } = await supabase
      .from('Folder')
      .select('*')
      .eq('id', id)
      .single();
    if (error) throw new Error(`${status}:${statusText} - ${error.message}`);
    return new Folder(data);
  }

  async insertOne(folder: FolderInput) {
    const { data, error, status, statusText } = await supabase
      .from('Folder')
      .insert(folder)
      .select();
    if (error) throw new Error(`${status}:${statusText} - ${error.message}`);
    return new Folder(data[0]);
  }

  async updateOne(folder: Folder) {
    const { error, status, statusText } = await supabase
      .from('Folder')
      .update(folder)
      .eq('id', folder.id)
      .select();
    if (error) throw new Error(`${status}:${statusText} - ${error.message}`);
  }

  async deleteMany(folder_ids: Folder['id'][]) {
    const file_paths = await Promise.all(
      folder_ids.map(async (folder_id) => {
        const {
          data: files,
          error: filesSelectError,
          status: filesSelectErrorStatus,
          statusText: filesSelectErrorStatusText,
        } = await supabase.from('File').select().eq('folder', folder_id);
        if (filesSelectError)
          throw new Error(
            `${filesSelectErrorStatus}:${filesSelectErrorStatusText} - ${filesSelectError.message}`,
          );
        return files.map((file) => file.name);
      }),
    );

    const {
      error: folderaDeleteError,
      status,
      statusText,
    } = await supabase.from('Folder').delete().in('id', folder_ids);
    if (folderaDeleteError)
      throw new Error(
        `${status}:${statusText} - ${folderaDeleteError.message}`,
      );

    if (file_paths.flat().length > 0)
      await this.supabaseStorageService.delete(file_paths.flat());
  }
}
