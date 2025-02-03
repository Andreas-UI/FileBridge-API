import dotenv from 'dotenv';
dotenv.config();

import { SupabaseFolderRepository } from '../../domain/repositories/SupabaseFolderRepository';
import { FindAllFolder } from '../../application/use-cases/FindAllFolder';

jest.mock('../../domain/repositories/SupabaseFolderRepository');

describe('FindAllFolder', () => {
  it('should find all folders', async () => {
    const mockFolders = [
      { subject: 'Folder 1', description: 'Description for folder 1' },
      { subject: 'Folder 2', description: 'Description for folder 2' },
    ];

    const mockFolderRepository = new SupabaseFolderRepository();
    mockFolderRepository.findAll = jest.fn().mockResolvedValue(mockFolders);
    const findAllFolder = new FindAllFolder(mockFolderRepository);
    const folders = await findAllFolder.execute();

    expect(folders).toEqual(mockFolders);
    expect(mockFolderRepository.findAll).toHaveBeenCalledTimes(1);
  });

  it('should handle an empty list of folders', async () => {
    const mockFolders: any[] = [];

    const mockFolderRepository = new SupabaseFolderRepository();
    mockFolderRepository.findAll = jest.fn().mockResolvedValue(mockFolders);
    const findAllFolder = new FindAllFolder(mockFolderRepository);
    const folders = await findAllFolder.execute();

    expect(folders).toEqual(mockFolders);
    expect(mockFolderRepository.findAll).toHaveBeenCalledTimes(1);
  });

  it('should handle errors when fetching folders', async () => {
    const mockFolderRepository = new SupabaseFolderRepository();
    mockFolderRepository.findAll = jest
      .fn()
      .mockRejectedValue(new Error('Database error'));

    const findAllFolder = new FindAllFolder(mockFolderRepository);

    await expect(findAllFolder.execute()).rejects.toThrow('Database error');
    expect(mockFolderRepository.findAll).toHaveBeenCalledTimes(1);
  });
});
