import { Request, Response, Router } from 'express';
import { SupabaseFileRepository } from '../../domain/repositories/SupabaseFileRepository';
import { CreateFiles } from '../../application/use-cases/CreateFiles';
import { FileController } from '../../interfaces/controllers/FileController';

const router = Router();

const fileRepository = new SupabaseFileRepository();
const createFiles = new CreateFiles(fileRepository);
const fileController = new FileController(createFiles);

router.post('/create', (req: Request, res: Response) =>
  fileController.create(req, res),
);

export { router as fileRoutes };
