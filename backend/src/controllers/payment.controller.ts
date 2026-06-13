import { Request, Response } from 'express';
import prisma from '../prisma';
import { AuthRequest } from '../middlewares/auth.middleware';

export const uploadPayment = async (req: AuthRequest, res: Response) => {
  try {
    const { appointmentId } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: 'Payment screenshot is required' });
    }

    const screenshotUrl = `/uploads/${req.file.filename}`;

    const payment = await prisma.payment.create({
      data: {
        appointmentId: parseInt(appointmentId),
        screenshotUrl,
        status: 'PENDING',
      },
    });

    // Update appointment status
    await prisma.appointment.update({
      where: { id: parseInt(appointmentId) },
      data: { status: 'PAYMENT_UPLOADED' },
    });

    return res.status(201).json({ message: 'Payment uploaded successfully', payment });
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const verifyPayment = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body; // VERIFIED or REJECTED

    if (!['VERIFIED', 'REJECTED'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    const assistant = await prisma.assistant.findUnique({
      where: { userId: req.user.id },
    });

    if (!assistant) {
      return res.status(404).json({ message: 'Assistant profile not found' });
    }

    const payment = await prisma.payment.update({
      where: { id: parseInt(id) },
      data: {
        status,
        verifiedBy: assistant.userId,
      },
      include: { appointment: true },
    });

    // Update appointment status based on payment verification
    const apptStatus = status === 'VERIFIED' ? 'CONFIRMED' : 'REJECTED';
    await prisma.appointment.update({
      where: { id: payment.appointmentId },
      data: { status: apptStatus },
    });

    return res.json({ message: `Payment ${status.toLowerCase()}`, payment });
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};
