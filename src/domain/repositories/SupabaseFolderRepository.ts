import { supabase } from '../../infrastructure/third-party/supabase';
import { Folder, FolderInput } from '../entities/Folder';
import { FolderRepository } from '../interfaces/FolderRepository';

export class SupabaseFolderRepository implements FolderRepository {
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

  async deleteMany(ids: number[]) {
    const { error, status, statusText } = await supabase
      .from('Folder')
      .delete()
      .in('id', ids);
    if (error) throw new Error(`${status}:${statusText} - ${error.message}`);
  }
}
