import { Request, Response, Router } from 'express';
import { SupabaseFolderRepository } from '../../domain/repositories/SupabaseFolderRepository';
import { CreateFolder } from '../../application/use-cases/CreateFolder';
import { FolderController } from '../../interfaces/controllers/FolderController';
import { FindAllFolder } from '../../application/use-cases/FindAllFolder';
import { FindByIdFolder } from '../../application/use-cases/FindByIdFolder';

const router = Router();

const folderRepository = new SupabaseFolderRepository();
const createFolder = new CreateFolder(folderRepository);
const findAllFolder = new FindAllFolder(folderRepository);
const findByIdFolder = new FindByIdFolder(folderRepository);
const folderController = new FolderController(
  createFolder,
  findAllFolder,
  findByIdFolder,
);

router.post('/create', (req: Request, res: Response) =>
  folderController.create(req, res),
);
router.get('/findById', (req: Request, res: Response) =>
  folderController.findById(req, res),
);
router.get('/findAll', (req: Request, res: Response) =>
  folderController.findAll(req, res),
);

export { router as folderRoutes };
