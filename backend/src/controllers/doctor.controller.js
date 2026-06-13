const prisma = require('../prisma');

const getDoctors = async (req, res) => {
  try {
    const { treatment_type } = req.query;
    const filter = {};
    if (treatment_type) filter.treatmentType = String(treatment_type);

    const doctors = await prisma.doctor.findMany({
      where: filter,
      include: { user: { select: { name: true, email: true } }, clinics: true },
    });
    return res.json(doctors);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const getDoctorById = async (req, res) => {
  try {
    const doctor = await prisma.doctor.findUnique({
      where: { id: parseInt(req.params.id) },
      include: { user: { select: { name: true, email: true } }, clinics: true },
    });
    if (!doctor) return res.status(404).json({ message: 'Doctor not found' });
    return res.json(doctor);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const addClinic = async (req, res) => {
  try {
    const { name, address, timings } = req.body;
    const doctor = await prisma.doctor.findUnique({ where: { userId: req.user.id } });
    if (!doctor) return res.status(404).json({ message: 'Doctor profile not found' });

    const clinic = await prisma.clinic.create({
      data: { doctorId: doctor.id, name, address, timings },
    });
    return res.status(201).json({ message: 'Clinic added successfully', clinic });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { getDoctors, getDoctorById, addClinic };
