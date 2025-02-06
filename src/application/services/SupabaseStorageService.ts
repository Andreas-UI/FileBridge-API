import { FileInput, File } from '../../domain/entities/File';
import { Folder } from '../../domain/entities/Folder';
import { supabase } from '../../infrastructure/third-party/supabase';
import { StorageService } from '../interfaces/StorageService';

export class SupabaseStorageService implements StorageService {
  private bucketName: string = 'USER_UPLOADS';

  async fileExists(folder_path: string, file_name: string): Promise<number> {
    const { data } = await supabase.storage
      .from(this.bucketName)
      .list(folder_path, {
        search: file_name,
      });
    return data ? data.length : 0;
  }

  async upload(folder: Folder, file: Express.Multer.File): Promise<File> {
    let folderPath = String(folder.id);
    let folderFilePath = file.originalname;

    let filePath = `${folderPath}/${folderFilePath}`;

    let counter = 2;
    let baseName = folderFilePath.split('.')[0];
    let ext = folderFilePath.split('.').pop();

    while (await this.fileExists(String(folderPath), folderFilePath)) {
      folderFilePath = `${baseName}_${counter}.${ext}`;
      filePath = `${folderPath}/${folderFilePath}`;
      counter++;
    }

    const { error: uploadError } = await supabase.storage
      .from(this.bucketName)
      .upload(filePath, file.buffer, {
        contentType: file.mimetype,
      });

    if (uploadError) throw new Error(` ${uploadError.message}`);

    const { data: publicUrl } = supabase.storage
      .from(this.bucketName)
      .getPublicUrl(filePath);

    const { data: fileInfo, error: fileInfoError } = await supabase.storage
      .from(this.bucketName)
      .info(filePath);

    if (fileInfoError) throw new Error(` ${fileInfoError.message}`);

    const fileInput = new FileInput({
      name: fileInfo.name,
      created_at: fileInfo.createdAt,
      folder: folder.id,
      mime_type: fileInfo.contentType,
      size_kb: fileInfo.size,
      url: publicUrl.publicUrl,
    });
    const {
      data: supabaseFile,
      error: SupabaseFileError,
      status,
      statusText,
    } = await supabase.from('File').insert(fileInput).select();

    if (SupabaseFileError)
      throw new Error(`${status}:${statusText} - ${SupabaseFileError.message}`);

    return supabaseFile[0];
  }
}
