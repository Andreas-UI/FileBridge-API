import { Tables } from '../../../database.types';
import { FolderRepository } from '../../domain/interfaces/FolderRepository';

export class FindAllFolder {
  constructor(private repository: FolderRepository) {}

  async execute(sort_by?: keyof Tables<'Folder'>) {
    return await this.repository.findAll(sort_by);
  }
}
