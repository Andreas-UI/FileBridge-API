import { Router } from 'express';
import { folderRoutes } from './folderRoutes';
import { fileRoutes } from './fileRoutes';

const router = Router();
router.use('/folder', folderRoutes);
router.use('/file', fileRoutes);
export { router };
