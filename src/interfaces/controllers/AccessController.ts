import { Request, Response } from 'express';
import { FindFilesByFolder } from '../../application/use-cases/FindFilesByFolder';
import { Controller } from './Controller';
import { decrypt } from '../../infrastructure/utils/encryption';
import { Folder } from '../../domain/entities/Folder';
import { DownloadFile } from '../../application/use-cases/DownloadFile';
import archiver from 'archiver';
import { Readable } from 'stream';

export class AccessController extends Controller {
  constructor(
    private findFilesByFolder: FindFilesByFolder,
    private downloadFile: DownloadFile,
  ) {
    super();
  }

  async handleAccess(req: Request, res: Response) {
    try {
      const encryptedId = req.params.id;
      const folder_id = decrypt(encryptedId) as unknown as number;

      // Get user agent for device detection
      const userAgent = req.headers['user-agent'] || '';
      const isMobile = /mobile|android|iphone|ipad|phone/i.test(userAgent);

      //   if (isMobile) {
      //     return this.handleMobileAccess(folder_id, req, res);
      //   }

      return this.handleWebAccess(folder_id, encryptedId, res);
    } catch (error) {
      res.status(400).json({ error: 'Invalid access code' });
    }
  }

  // TODO:: Consider to be removed, may be redundant in the future
  async handleMobileAccess(
    folder_id: Folder['id'],
    req: Request,
    res: Response,
  ) {
    await this.handleRequest(req, res, async () => {
      const files = await this.findFilesByFolder.execute(folder_id);
      return files;
    });
  }

  async handleWebAccess(
    folder_id: Folder['id'],
    encryptedId: string,
    res: Response,
  ) {
    try {
      const files = await this.findFilesByFolder.execute(folder_id);
      res.render('folder-view', {
        files: files,
        folder_id: folder_id,
        qrCodeUrl: `${process.env.BASE_URL!}/folder/files/access/${encryptedId}/qr`,
      });
    } catch (error) {
      res.status(500).send('Error loading folder');
    }
  }

  async download(req: Request, res: Response) {
    const { folder_id, file_paths } = req.body;

    res.setHeader('Content-Type', 'application/zip');
    res.setHeader(
      'Content-Disposition',
      `attachment; filename=${folder_id}.zip`,
    );

    const archive = archiver('zip');
    archive.pipe(res);

    try {
      for (const file_path of file_paths) {
        try {
          const blob = await this.downloadFile.execute(file_path);
          const buffer = await blob.arrayBuffer();
          const stream = Readable.from(Buffer.from(buffer));

          archive.append(stream, {
            name: file_path.replace(`${folder_id}/`, ''),
          });
        } catch (error) {
          console.error(`Error processing file ${file_path}:`, error);
        }
      }

      await archive.finalize();
    } catch (error) {
      console.error('Error creating zip:', error);
      res.status(500).send('Error creating zip file');
    }
  }
}
