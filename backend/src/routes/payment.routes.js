const { Router } = require('express');
const { uploadPayment, verifyPayment } = require('../controllers/payment.controller');
const { authenticate, authorizeRoles } = require('../middlewares/auth.middleware');
const { upload } = require('../middlewares/upload.middleware');

const router = Router();

router.post('/', authenticate, authorizeRoles('PATIENT'), upload.single('screenshot'), uploadPayment);
router.patch('/:id/verify', authenticate, authorizeRoles('ASSISTANT'), verifyPayment);

module.exports = router;
