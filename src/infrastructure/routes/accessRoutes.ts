import { Router } from 'express';
import { AccessController } from '../../interfaces/controllers/AccessController';
import { FindFilesByFolder } from '../../application/use-cases/FindFilesByFolder';
import { SupabaseFileRepository } from '../../domain/repositories/SupabaseFileRepository';
import { DownloadFile } from '../../application/use-cases/DownloadFile';

const router = Router();

const fileRepository = new SupabaseFileRepository();
const findFilesByFolder = new FindFilesByFolder(fileRepository);
const downloadFile = new DownloadFile(fileRepository);
const accessController = new AccessController(findFilesByFolder, downloadFile);

router.get('/access/:id', (req, res) =>
  accessController.handleAccess(req, res),
);
router.post('/download-zip', (req, res) => accessController.download(req, res));

export { router as accessRoutes };
