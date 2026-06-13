import { Router } from 'express';
import { uploadPayment, verifyPayment } from '../controllers/payment.controller';
import { authenticate, authorizeRoles } from '../middlewares/auth.middleware';
import { upload } from '../middlewares/upload.middleware';

const router = Router();

router.post(
  '/',
  authenticate,
  authorizeRoles('PATIENT'),
  upload.single('screenshot'),
  uploadPayment
);

router.patch(
  '/:id/verify',
  authenticate,
  authorizeRoles('ASSISTANT'),
  verifyPayment
);

export default router;
