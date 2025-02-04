import { FolderRepository } from '../../domain/interfaces/FolderRepository';

export class FindByIdFolder {
  constructor(private repository: FolderRepository) {}

  async execute(id: number) {
    return await this.repository.findById(id);
  }
}
