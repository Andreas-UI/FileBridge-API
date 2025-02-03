import { Router } from 'express';
import { SupabaseFolderRepository } from '../../domain/repositories/SupabaseFolderRepository';
import { CreateFolder } from '../../application/use-cases/CreateFolder';
import { FolderController } from '../../interfaces/controllers/FolderController';
import { FindAllFolder } from '../../application/use-cases/FindAllFolder';

const router = Router();

const folderRepository = new SupabaseFolderRepository();
const createFolder = new CreateFolder(folderRepository);
const findAllFolder = new FindAllFolder(folderRepository);
const folderController = new FolderController(createFolder, findAllFolder);

router.post('/create', (req, res) => folderController.create(req, res));
router.get('/findAll', (req, res) => folderController.findAll(req, res));

export { router as folderRoutes };
