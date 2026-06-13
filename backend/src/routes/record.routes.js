const { Router } = require('express');
const { body, validationResult } = require('express-validator');
const { addMedicalHistory, getMedicalHistory, addPrescription, getPrescriptions } = require('../controllers/record.controller');
const { authenticate, authorizeRoles } = require('../middlewares/auth.middleware');

const router = Router();
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  next();
};

router.post('/history', authenticate, authorizeRoles('DOCTOR'), [
  body('patientId').isInt(), body('notes').notEmpty(), validate
], addMedicalHistory);

router.get('/history', authenticate, authorizeRoles('PATIENT', 'DOCTOR'), getMedicalHistory);

router.post('/prescriptions', authenticate, authorizeRoles('DOCTOR'), [
  body('appointmentId').isInt(), body('details').notEmpty(), validate
], addPrescription);

router.get('/prescriptions/:patient_id', authenticate, getPrescriptions);

module.exports = router;
