import { Router } from 'express';
import { bookAppointment, getAppointmentDetails, updateAppointmentStatus } from '../controllers/appointment.controller';
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

router.post(
  '/',
  authenticate,
  authorizeRoles('PATIENT'),
  [
    body('doctorId').isInt().withMessage('Doctor ID is required'),
    body('clinicId').isInt().withMessage('Clinic ID is required'),
    body('date').isISO8601().withMessage('Valid date is required'),
    body('time').notEmpty().withMessage('Time is required'),
    validate
  ],
  bookAppointment
);

router.get('/:id', authenticate, getAppointmentDetails);

router.patch(
  '/:id/status',
  authenticate,
  authorizeRoles('ASSISTANT'),
  [
    body('status').isIn(['CONFIRMED', 'REJECTED']).withMessage('Valid status is required'),
    validate
  ],
  updateAppointmentStatus
);

export default router;
