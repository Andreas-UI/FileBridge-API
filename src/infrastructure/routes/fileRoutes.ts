import { Request, Response, Router } from 'express';
import { SupabaseFileRepository } from '../../domain/repositories/SupabaseFileRepository';
import { CreateFiles } from '../../application/use-cases/CreateFiles';
import { FileController } from '../../interfaces/controllers/FileController';
import { DeleteFiles } from '../../application/use-cases/DeleteFiles';
import { FindFilesByFolder } from '../../application/use-cases/FindFilesByFolder';

const router = Router();

const fileRepository = new SupabaseFileRepository();
const createFiles = new CreateFiles(fileRepository);
const deleteFile = new DeleteFiles(fileRepository);
const findFilesByFolder = new FindFilesByFolder(fileRepository);
const fileController = new FileController(
  createFiles,
  deleteFile,
  findFilesByFolder,
);

router.post('/create', (req: Request, res: Response) =>
  fileController.create(req, res),
);

router.post('/delete', (req: Request, res: Response) =>
  fileController.delete(req, res),
);
router.get('/mobile/access/:id', (req: Request, res: Response) =>
  fileController.findByFolder(req, res),
);

export { router as fileRoutes };
