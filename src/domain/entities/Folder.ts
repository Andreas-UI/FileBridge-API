import { Tables, TablesInsert } from '../../../database.types';

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
