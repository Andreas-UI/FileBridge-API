import { Request, Response, Router } from 'express';
import { SupabaseFolderRepository } from '../../domain/repositories/SupabaseFolderRepository';
import { CreateFolder } from '../../application/use-cases/CreateFolder';
import { FolderController } from '../../interfaces/controllers/FolderController';
import { FindAllFolder } from '../../application/use-cases/FindAllFolder';
import { FindByIdFolder } from '../../application/use-cases/FindByIdFolder';
import { DeleteFolders } from '../../application/use-cases/DeleteFolders';

const router = Router();

const folderRepository = new SupabaseFolderRepository();
const createFolder = new CreateFolder(folderRepository);
const findAllFolder = new FindAllFolder(folderRepository);
const findByIdFolder = new FindByIdFolder(folderRepository);
const deleteFolders = new DeleteFolders(folderRepository);
const folderController = new FolderController(
  createFolder,
  findAllFolder,
  findByIdFolder,
  deleteFolders,
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
router.post('/delete', (req: Request, res: Response) =>
  folderController.delete(req, res),
);

export { router as folderRoutes };
