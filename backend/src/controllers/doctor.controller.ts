import { Request, Response } from 'express';
import prisma from '../prisma';
import { AuthRequest } from '../middlewares/auth.middleware';

export const getDoctors = async (req: Request, res: Response) => {
  try {
    const { treatment_type } = req.query;

    const filter: any = {};
    if (treatment_type) {
      filter.treatmentType = String(treatment_type);
    }
    // "disease" filter could potentially match specialization or bio if we want a simple text search
    // Since we don't have a specific "diseases" array, let's just implement treatmentType filtering for now.

    const doctors = await prisma.doctor.findMany({
      where: filter,
      include: {
        user: {
          select: { name: true, email: true },
        },
        clinics: true,
      },
    });

    return res.json(doctors);
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const getDoctorById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const doctor = await prisma.doctor.findUnique({
      where: { id: parseInt(id) },
      include: {
        user: {
          select: { name: true, email: true },
        },
        clinics: true,
      },
    });

    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }

    return res.json(doctor);
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const addClinic = async (req: AuthRequest, res: Response) => {
  try {
    const { name, address, timings } = req.body;
    
    // AuthRequest.user has the token payload: { id: userId, role }
    // We need to find the doctorId associated with this userId
    const doctor = await prisma.doctor.findUnique({
      where: { userId: req.user.id },
    });

    if (!doctor) {
      return res.status(404).json({ message: 'Doctor profile not found' });
    }

    const clinic = await prisma.clinic.create({
      data: {
        doctorId: doctor.id,
        name,
        address,
        timings,
      },
    });

    return res.status(201).json({ message: 'Clinic added successfully', clinic });
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};
