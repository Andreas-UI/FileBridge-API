import { Router } from 'express';
import { folderRoutes } from './folderRoutes';

const router = Router();
router.use('/folder', folderRoutes);

export { router };
