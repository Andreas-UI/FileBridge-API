import dotenv from 'dotenv';
dotenv.config();

import { CreateFolder } from '../../application/use-cases/CreateFolder';
import { FolderInput } from '../../domain/entities/Folder';
import { SupabaseFolderRepository } from '../../domain/repositories/SupabaseFolderRepository';

describe('CreateFolder', () => {
  it('should create a new folder', async () => {
    const mockData = new FolderInput({
      subject: 'Test Folder with Description',
      description: 'This is the folder description',
    });

    const mockFolderRepository = new SupabaseFolderRepository();
    const createFolder = new CreateFolder(mockFolderRepository);
    const folder = await createFolder.execute(mockData);
    expect(folder).toMatchObject({
      subject: mockData.subject,
      description: mockData.description,
    });
  });

  it('should create a new folder without description', async () => {
    const mockData = new FolderInput({
      subject: 'Test Folder without Description',
    });
    const mockFolderRepository = new SupabaseFolderRepository();
    const createFolder = new CreateFolder(mockFolderRepository);
    const folder = await createFolder.execute(mockData);
    expect(folder).toMatchObject({
      subject: mockData.subject,
      description: null,
    });
  });

  it('should throw an error if subject is missing', async () => {
    const mockData = {
      description: 'This folder has no subject',
    } as FolderInput;
    const mockFolderRepository = new SupabaseFolderRepository();
    const createFolder = new CreateFolder(mockFolderRepository);
    await expect(createFolder.execute(mockData)).rejects.toThrow();
  });

  it('should create a folder with empty description', async () => {
    const mockData = new FolderInput({
      subject: 'Test Folder with Empty Description',
      description: '',
    });
    const mockFolderRepository = new SupabaseFolderRepository();
    const createFolder = new CreateFolder(mockFolderRepository);
    const folder = await createFolder.execute(mockData);
    expect(folder).toMatchObject({
      subject: mockData.subject,
      description: '',
    });
  });

  it('should create a folder with special characters in subject and description', async () => {
    const mockData = new FolderInput({
      subject: '@#&Test Folder with Special Characters$%',
      description: '$@Description with Special! Characters%',
    });
    const mockFolderRepository = new SupabaseFolderRepository();
    const createFolder = new CreateFolder(mockFolderRepository);
    const folder = await createFolder.execute(mockData);
    expect(folder).toMatchObject({
      subject: mockData.subject,
      description: mockData.description,
    });
  });

  it('should handle null values gracefully for both subject and description', async () => {
    const mockData = {
      subject: null,
      description: null,
    } as unknown as FolderInput;
    const mockFolderRepository = new SupabaseFolderRepository();
    const createFolder = new CreateFolder(mockFolderRepository);
    await expect(createFolder.execute(mockData)).rejects.toThrow();
  });

  it('should create a folder with long subject and description', async () => {
    const mockData = new FolderInput({
      subject: 'a'.repeat(255),
      description: 'b'.repeat(1000),
    });
    const mockFolderRepository = new SupabaseFolderRepository();
    const createFolder = new CreateFolder(mockFolderRepository);
    const folder = await createFolder.execute(mockData);
    expect(folder).toMatchObject({
      subject: mockData.subject,
      description: mockData.description,
    });
  });

  it('should handle folder creation failure due to repository error', async () => {
    const mockData = new FolderInput({
      subject: 'Test Folder Failure',
      description: 'This will fail',
    });
    const mockFolderRepository = new SupabaseFolderRepository();
    jest
      .spyOn(mockFolderRepository, 'insertOne')
      .mockRejectedValue(new Error('Repository error'));
    const createFolder = new CreateFolder(mockFolderRepository);
    await expect(createFolder.execute(mockData)).rejects.toThrow(
      'Repository error',
    );
  });

  it('should create a folder with boolean values in description', async () => {
    const mockData = {
      subject: 'Test Folder with Boolean in Description',
      description: true,
    } as unknown as FolderInput;
    const mockFolderRepository = new SupabaseFolderRepository();
    const createFolder = new CreateFolder(mockFolderRepository);
    const folder = await createFolder.execute(mockData);
    expect(folder).toMatchObject({
      subject: mockData.subject,
      description: mockData.description?.toString(),
    });
  });

  it('should create a folder with numeric characters', async () => {
    const mockData = {
      subject: 123456789,
      description: 1234567890,
    } as unknown as FolderInput;
    const mockFolderRepository = new SupabaseFolderRepository();
    const createFolder = new CreateFolder(mockFolderRepository);
    const folder = await createFolder.execute(mockData);
    expect(folder).toMatchObject({
      subject: mockData.subject.toString(),
      description: mockData.description?.toString(),
    });
  });
});
