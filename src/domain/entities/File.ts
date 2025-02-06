import { Tables, TablesInsert } from '../../../database.types';

export class File implements Tables<'File'> {
  created_at: string;
  folder: number | null;
  id: number;
  mime_type: string | null;
  name: string;
  size_kb: number | null;
  user: string | null;
  url: string;

  constructor({
    created_at,
    folder,
    id,
    mime_type,
    name,
    size_kb,
    user,
    url,
  }: {
    created_at: string;
    folder: number | null;
    id: number;
    mime_type: string | null;
    name: string;
    size_kb: number | null;
    user: string | null;
    url: string;
  }) {
    this.created_at = created_at;
    this.folder = folder;
    this.id = id;
    this.mime_type = mime_type;
    this.name = name;
    this.size_kb = size_kb;
    this.user = user;
    this.url = url;
  }
}

export class FileInput implements TablesInsert<'File'> {
  created_at?: string | undefined;
  folder?: number | null | undefined;
  id?: number | undefined;
  mime_type?: string | null | undefined;
  name: string;
  size_kb?: number | null | undefined;
  user?: string | null | undefined;
  url: string;

  constructor({
    created_at,
    folder,
    id,
    mime_type,
    name,
    size_kb,
    user,
    url,
  }: {
    created_at?: string | undefined;
    folder?: number | null | undefined;
    id?: number | undefined;
    mime_type?: string | null | undefined;
    name: string;
    size_kb?: number | null | undefined;
    user?: string | null | undefined;
    url: string;
  }) {
    this.created_at = created_at;
    this.folder = folder;
    this.id = id;
    this.mime_type = mime_type;
    this.name = name;
    this.size_kb = size_kb;
    this.user = user;
    this.url = url;
  }
}
