import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import prisma from '../prisma';
import { generateToken } from '../utils/jwt';

export const register = async (req: Request, res: Response) => {
  try {
    const { email, password, name, role, ...rest } = req.body;

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await prisma.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: {
          email,
          password: hashedPassword,
          name,
          role,
        },
      });

      if (role === 'PATIENT') {
        await tx.patient.create({
          data: {
            userId: user.id,
            dob: new Date(rest.dob),
            gender: rest.gender,
            bloodGroup: rest.bloodGroup,
          },
        });
      } else if (role === 'DOCTOR') {
        await tx.doctor.create({
          data: {
            userId: user.id,
            specialization: rest.specialization,
            treatmentType: rest.treatmentType,
            experience: parseInt(rest.experience) || 0,
            bio: rest.bio || '',
          },
        });
      } else if (role === 'ASSISTANT') {
        await tx.assistant.create({
          data: {
            userId: user.id,
            doctorId: parseInt(rest.doctorId),
          },
        });
      }
      return user;
    });

    const token = generateToken(result.id, result.role);

    return res.status(201).json({
      message: 'User registered successfully',
      token,
      user: { id: result.id, name: result.name, email: result.email, role: result.role },
    });
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = generateToken(user.id, user.role);

    return res.json({
      message: 'Login successful',
      token,
      user: { id: user.id, name: user.name, email: user.email, role: user.role },
    });
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};
