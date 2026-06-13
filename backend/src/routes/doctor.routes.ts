import { Router } from 'express';
import { getDoctors, getDoctorById, addClinic } from '../controllers/doctor.controller';
import { authenticate, authorizeRoles } from '../middlewares/auth.middleware';
import { body, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

const router = Router();

const validate = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

router.get('/', getDoctors);
router.get('/:id', getDoctorById);

router.post(
  '/clinic',
  authenticate,
  authorizeRoles('DOCTOR'),
  [
    body('name').notEmpty().withMessage('Clinic name is required'),
    body('address').notEmpty().withMessage('Address is required'),
    body('timings').notEmpty().withMessage('Timings are required'),
    validate
  ],
  addClinic
);

export default router;
