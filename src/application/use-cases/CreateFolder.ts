import { Folder, FolderInput } from "../../domain/entities/Folder";
import { FolderRepository } from "../../domain/interfaces/FolderRepository";

export class CreateFolder {
  constructor(private repository: FolderRepository) { }

  async execute(folder: FolderInput) {
    return await this.repository.insertOne(folder);
  }
}
