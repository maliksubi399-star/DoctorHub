import { Router } from 'express';
import { addMedicalHistory, getMedicalHistory, addPrescription, getPrescriptions } from '../controllers/record.controller';
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

// HISTORY
router.post(
  '/history',
  authenticate,
  authorizeRoles('DOCTOR'),
  [
    body('patientId').isInt().withMessage('Patient ID is required'),
    body('notes').notEmpty().withMessage('Notes are required'),
    validate
  ],
  addMedicalHistory
);

router.get('/history', authenticate, authorizeRoles('PATIENT', 'DOCTOR'), getMedicalHistory);

// PRESCRIPTIONS
router.post(
  '/prescriptions',
  authenticate,
  authorizeRoles('DOCTOR'),
  [
    body('appointmentId').isInt().withMessage('Appointment ID is required'),
    body('details').notEmpty().withMessage('Details are required'),
    validate
  ],
  addPrescription
);

router.get('/prescriptions/:patient_id', authenticate, getPrescriptions);

export default router;
