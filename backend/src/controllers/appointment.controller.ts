import { Request, Response } from 'express';
import prisma from '../prisma';
import { AuthRequest } from '../middlewares/auth.middleware';

export const bookAppointment = async (req: AuthRequest, res: Response) => {
  try {
    const { doctorId, clinicId, date, time } = req.body;

    const patient = await prisma.patient.findUnique({
      where: { userId: req.user.id },
    });

    if (!patient) {
      return res.status(404).json({ message: 'Patient profile not found' });
    }

    const appointment = await prisma.appointment.create({
      data: {
        patientId: patient.id,
        doctorId: parseInt(doctorId),
        clinicId: parseInt(clinicId),
        date: new Date(date),
        time,
        status: 'PENDING',
      },
    });

    return res.status(201).json({ message: 'Appointment booked successfully', appointment });
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const getAppointmentDetails = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;

    const appointment = await prisma.appointment.findUnique({
      where: { id: parseInt(id) },
      include: {
        patient: { include: { user: { select: { name: true, email: true } } } },
        doctor: { include: { user: { select: { name: true, email: true } } } },
        clinic: true,
        payment: true,
        prescription: true,
      },
    });

    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    // Optional: Add logic to ensure only the involved patient, doctor, or assistant can view it

    return res.json(appointment);
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const updateAppointmentStatus = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body; // CONFIRMED or REJECTED

    if (!['CONFIRMED', 'REJECTED'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    const appointment = await prisma.appointment.update({
      where: { id: parseInt(id) },
      data: { status },
    });

    return res.json({ message: `Appointment ${status.toLowerCase()}`, appointment });
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};
