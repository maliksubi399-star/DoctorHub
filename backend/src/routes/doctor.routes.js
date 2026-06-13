const { Router } = require('express');
const { body, validationResult } = require('express-validator');
const { getDoctors, getDoctorById, addClinic } = require('../controllers/doctor.controller');
const { authenticate, authorizeRoles } = require('../middlewares/auth.middleware');

const router = Router();
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  next();
};

router.get('/', getDoctors);
router.get('/:id', getDoctorById);
router.post('/clinic', authenticate, authorizeRoles('DOCTOR'), [
  body('name').notEmpty(), body('address').notEmpty(), body('timings').notEmpty(), validate
], addClinic);

module.exports = router;
