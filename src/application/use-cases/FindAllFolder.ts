import { FolderRepository } from '../../domain/interfaces/FolderRepository';

export class FindAllFolder {
  constructor(private repository: FolderRepository) {}

  async execute() {
    return await this.repository.findAll();
  }
}
