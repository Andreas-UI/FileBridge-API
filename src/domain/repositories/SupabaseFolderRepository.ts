import { toBuffer } from 'qrcode';
import { SupabaseStorageService } from '../../application/services/SupabaseStorageService';
import { supabase } from '../../infrastructure/third-party/supabase';
import { encrypt } from '../../infrastructure/utils/encryption';
import { Folder, FolderInput, FolderWithFiles } from '../entities/Folder';
import { FolderRepository } from '../interfaces/FolderRepository';

export class SupabaseFolderRepository implements FolderRepository {
  private supabaseStorageService = new SupabaseStorageService();

  async findAll() {
    const { data, error, status, statusText } = await supabase
      .from('Folder')
      .select('*, files: File(*)');

    if (error) throw new Error(`${status}:${statusText} - ${error.message}`);

    const foldersWithFilesAndCount = data.map((folder) => ({
      ...folder,
      file_count: folder.files.length,
    }));

    return foldersWithFilesAndCount;
  }

  async findById(id: number) {
    const { data, error, status, statusText } = await supabase
      .from('Folder')
      .select('*, files: File(*)')
      .eq('id', id)
      .single();
    if (error) throw new Error(`${status}:${statusText} - ${error.message}`);

    const folderWithFilesAndCount = {
      ...data,
      file_count: data.files.length,
    };

    return new FolderWithFiles(folderWithFilesAndCount);
  }

  async insertOne(folder: FolderInput) {
    const { data, error, status, statusText } = await supabase
      .from('Folder')
      .insert(folder)
      .select()
      .single();
    if (error) throw new Error(`${status}:${statusText} - ${error.message}`);

    const folderId = data.id;

    const encryptedId = encrypt(String(folderId));
    const qrUrl = `${process.env.BASE_URL}/folder/files/access/${encryptedId}`;
    const qrBuffer = await toBuffer(qrUrl);
    const qrCodeMulterFile: Express.Multer.File = {
      fieldname: 'qr',
      originalname: 'qrcode.png',
      encoding: '7bit',
      mimetype: 'image/png',
      buffer: qrBuffer,
      size: qrBuffer.length,
      stream: null as any,
      destination: '',
      filename: '',
      path: '',
    };

    const qrCodeFile = await this.supabaseStorageService.upload(
      folderId,
      qrCodeMulterFile,
    );

    const {
      data: updatedFolder,
      error: updateFolderError,
      status: updateFolderErrorStatus,
      statusText: updateFolderErrorStatusText,
    } = await supabase
      .from('Folder')
      .update({ qrcode_url: qrCodeFile.url })
      .eq('id', folderId)
      .select()
      .single();
    if (updateFolderError)
      throw new Error(
        `${updateFolderErrorStatus}:${updateFolderErrorStatusText} - ${updateFolderError.message}`,
      );

    return new Folder(updatedFolder);
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
