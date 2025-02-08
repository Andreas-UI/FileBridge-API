import { Request, Response, Router } from 'express';
import { SupabaseAuthService } from '../../application/services/SupabaseAuthService';
import { SendMagicLinkAuth } from '../../application/use-cases/SendMagicLinkAuth';
import { GetUserAuth } from '../../application/use-cases/GetUserAuth';
import { AuthController } from '../../interfaces/controllers/AuthController';
import { VerifyHashTokenAuth } from '../../application/use-cases/VerifyHashTokenAuth';

const router = Router();

const authService = new SupabaseAuthService();
const sendMagicLink = new SendMagicLinkAuth(authService);
const getUser = new GetUserAuth(authService);
const verifyHashToken = new VerifyHashTokenAuth(authService);
const authController = new AuthController(
  sendMagicLink,
  getUser,
  verifyHashToken,
);

router.post('/magic-link', (req: Request, res: Response) =>
  authController.sendMagicLink(req, res),
);

// TODO:: Error Response when GET /user
router.get('/user', (req: Request, res: Response) =>
  authController.getUser(req, res),
);
router.get('/verify', (req: Request, res: Response) =>
  authController.verifyHashToken(req, res),
);

export { router as authRoutes };
