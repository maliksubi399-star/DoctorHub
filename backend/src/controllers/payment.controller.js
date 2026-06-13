const prisma = require('../prisma');

const uploadPayment = async (req, res) => {
  try {
    const { appointmentId } = req.body;
    if (!req.file) return res.status(400).json({ message: 'Payment screenshot is required' });

    const screenshotUrl = `/uploads/${req.file.filename}`;
    const payment = await prisma.payment.create({
      data: { appointmentId: parseInt(appointmentId), screenshotUrl, status: 'PENDING' },
    });
    await prisma.appointment.update({
      where: { id: parseInt(appointmentId) },
      data: { status: 'PAYMENT_UPLOADED' },
    });
    return res.status(201).json({ message: 'Payment uploaded successfully', payment });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const verifyPayment = async (req, res) => {
  try {
    const { status } = req.body;
    if (!['VERIFIED', 'REJECTED'].includes(status)) return res.status(400).json({ message: 'Invalid status' });

    const assistant = await prisma.assistant.findUnique({ where: { userId: req.user.id } });
    if (!assistant) return res.status(404).json({ message: 'Assistant profile not found' });

    const payment = await prisma.payment.update({
      where: { id: parseInt(req.params.id) },
      data: { status, verifiedBy: assistant.userId },
      include: { appointment: true },
    });

    const apptStatus = status === 'VERIFIED' ? 'CONFIRMED' : 'REJECTED';
    await prisma.appointment.update({ where: { id: payment.appointmentId }, data: { status: apptStatus } });

    return res.json({ message: `Payment ${status.toLowerCase()}`, payment });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { uploadPayment, verifyPayment };
