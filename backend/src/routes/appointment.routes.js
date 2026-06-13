const { Router } = require('express');
const { body, validationResult } = require('express-validator');
const { bookAppointment, getAppointmentDetails, updateAppointmentStatus } = require('../controllers/appointment.controller');
const { authenticate, authorizeRoles } = require('../middlewares/auth.middleware');

const router = Router();
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  next();
};

router.post('/', authenticate, authorizeRoles('PATIENT'), [
  body('doctorId').isInt(), body('clinicId').isInt(), body('date').isISO8601(), body('time').notEmpty(), validate
], bookAppointment);

router.get('/:id', authenticate, getAppointmentDetails);

router.patch('/:id/status', authenticate, authorizeRoles('ASSISTANT'), [
  body('status').isIn(['CONFIRMED', 'REJECTED']), validate
], updateAppointmentStatus);

module.exports = router;
