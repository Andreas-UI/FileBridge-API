import { Tables, TablesInsert } from '../../../database.types';
import { File } from './File';

export class Folder implements Tables<'Folder'> {
  created_at: string;
  description: string | null;
  id: number;
  subject: string;
  user: string | null;
  qrcode_url: string | null;

  constructor({
    subject,
    created_at,
    description,
    id,
    user,
    qrcode_url,
  }: {
    created_at: string;
    description: string | null;
    id: number;
    subject: string;
    user: string | null;
    qrcode_url: string | null;
  }) {
    this.subject = subject;
    this.created_at = created_at;
    this.description = description;
    this.id = id;
    this.user = user;
    this.qrcode_url = qrcode_url;
  }
}

export class FolderWithFiles extends Folder {
  files: File[];
  file_count: number;

  constructor({
    subject,
    created_at,
    description,
    id,
    user,
    qrcode_url,
    files,
    file_count,
  }: {
    created_at: string;
    description: string | null;
    id: number;
    subject: string;
    user: string | null;
    qrcode_url: string | null;
    files: File[];
    file_count: number;
  }) {
    super({
      subject,
      created_at,
      description,
      id,
      user,
      qrcode_url,
    });
    this.files = files;
    this.file_count = file_count;
  }
}

export class FolderInput implements TablesInsert<'Folder'> {
  created_at?: string | undefined;
  description?: string | null | undefined;
  id?: number | undefined;
  qrcode_url?: string | null | undefined;
  subject: string;
  user?: string | null | undefined;

  constructor({
    subject,
    created_at,
    description,
    id,
    user,
    qrcode_url,
  }: {
    created_at?: string | undefined;
    description?: string | null | undefined;
    id?: number | undefined;
    subject: string;
    user?: string | null | undefined;
    qrcode_url?: string | null | undefined;
  }) {
    this.subject = subject;
    this.created_at = created_at;
    this.description = description;
    this.id = id;
    this.user = user;
    this.qrcode_url = qrcode_url;
  }
}
