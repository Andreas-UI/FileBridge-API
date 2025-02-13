import { Router } from 'express';
import { AccessController } from '../../interfaces/controllers/AccessController';
import { FindFilesByFolder } from '../../application/use-cases/FindFilesByFolder';
import { SupabaseFileRepository } from '../../domain/repositories/SupabaseFileRepository';
import { DownloadFile } from '../../application/use-cases/DownloadFile';
import { decrypt } from '../utils/encryption';

const router = Router();

const fileRepository = new SupabaseFileRepository();
const findFilesByFolder = new FindFilesByFolder(fileRepository);
const downloadFile = new DownloadFile(fileRepository);
const accessController = new AccessController(findFilesByFolder, downloadFile);

router.get('/access/:id', (req, res) =>
  accessController.handleAccess(req, res),
);
router.post('/access/decrypt', (req, res) => {
  try {
    const { enc } = req.body;
    const [ivHex, encryptedHex] = enc.split(':');
    if (!ivHex || !encryptedHex) {
      res.status(400).json({ error: 'Invalid encrypted format' });
    }
    const decrypted = decrypt(enc);
    setTimeout(() => res.json(decrypted.toString()), 5000);
  } catch (error) {
    console.error('Decryption error:', error);
    res.status(500).json({ error: 'Failed to decrypt data' });
  }
});

router.post('/download-zip', (req, res) => accessController.download(req, res));

export { router as accessRoutes };
