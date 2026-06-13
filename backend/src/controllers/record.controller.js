const prisma = require('../prisma');

const addMedicalHistory = async (req, res) => {
  try {
    const { patientId, notes } = req.body;
    const doctor = await prisma.doctor.findUnique({ where: { userId: req.user.id } });
    if (!doctor) return res.status(404).json({ message: 'Doctor profile not found' });

    const history = await prisma.medicalHistory.create({
      data: { patientId: parseInt(patientId), doctorId: doctor.id, notes },
    });
    return res.status(201).json({ message: 'Medical history added', history });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const getMedicalHistory = async (req, res) => {
  try {
    if (req.user.role === 'PATIENT') {
      const patient = await prisma.patient.findUnique({ where: { userId: req.user.id } });
      if (!patient) return res.status(404).json({ message: 'Patient not found' });
      const history = await prisma.medicalHistory.findMany({
        where: { patientId: patient.id },
        include: { doctor: { include: { user: { select: { name: true } } } } },
        orderBy: { createdAt: 'desc' },
      });
      return res.json(history);
    } else if (req.user.role === 'DOCTOR') {
      const { patientId } = req.query;
      if (!patientId) return res.status(400).json({ message: 'patientId is required for doctors' });

      const doctor = await prisma.doctor.findUnique({ where: { userId: req.user.id } });
      if (!doctor) return res.status(404).json({ message: 'Doctor not found' });

      const appointmentExists = await prisma.appointment.findFirst({
        where: { doctorId: doctor.id, patientId: parseInt(patientId) },
      });
      if (!appointmentExists) return res.status(403).json({ message: 'Not authorized to view this patient\'s history' });

      const history = await prisma.medicalHistory.findMany({
        where: { patientId: parseInt(patientId) },
        include: { doctor: { include: { user: { select: { name: true } } } } },
        orderBy: { createdAt: 'desc' },
      });
      return res.json(history);
    }
    return res.status(403).json({ message: 'Forbidden' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const addPrescription = async (req, res) => {
  try {
    const { appointmentId, details } = req.body;
    const doctor = await prisma.doctor.findUnique({ where: { userId: req.user.id } });
    if (!doctor) return res.status(404).json({ message: 'Doctor profile not found' });

    const appointment = await prisma.appointment.findUnique({ where: { id: parseInt(appointmentId) } });
    if (!appointment || appointment.doctorId !== doctor.id) return res.status(403).json({ message: 'Invalid appointment or not authorized' });

    const existing = await prisma.prescription.findUnique({ where: { appointmentId: parseInt(appointmentId) } });
    if (existing) return res.status(400).json({ message: 'Prescription already exists for this appointment' });

    const prescription = await prisma.prescription.create({
      data: { appointmentId: parseInt(appointmentId), doctorId: doctor.id, details },
    });
    return res.status(201).json({ message: 'Prescription added', prescription });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const getPrescriptions = async (req, res) => {
  try {
    const { patient_id } = req.params;
    if (req.user.role === 'PATIENT') {
      const patient = await prisma.patient.findUnique({ where: { userId: req.user.id } });
      if (patient?.id !== parseInt(patient_id)) return res.status(403).json({ message: 'Forbidden' });
    }
    const prescriptions = await prisma.prescription.findMany({
      where: { appointment: { patientId: parseInt(patient_id) } },
      include: {
        appointment: { select: { date: true, time: true } },
        doctor: { include: { user: { select: { name: true } } } },
      },
      orderBy: { createdAt: 'desc' },
    });
    return res.json(prescriptions);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { addMedicalHistory, getMedicalHistory, addPrescription, getPrescriptions };
