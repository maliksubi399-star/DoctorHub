const prisma = require('../prisma');

const bookAppointment = async (req, res) => {
  try {
    const { doctorId, clinicId, date, time } = req.body;
    const patient = await prisma.patient.findUnique({ where: { userId: req.user.id } });
    if (!patient) return res.status(404).json({ message: 'Patient profile not found' });

    const appointment = await prisma.appointment.create({
      data: { patientId: patient.id, doctorId: parseInt(doctorId), clinicId: parseInt(clinicId), date: new Date(date), time, status: 'PENDING' },
    });
    return res.status(201).json({ message: 'Appointment booked successfully', appointment });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const getAppointmentDetails = async (req, res) => {
  try {
    const appointment = await prisma.appointment.findUnique({
      where: { id: parseInt(req.params.id) },
      include: {
        patient: { include: { user: { select: { name: true, email: true } } } },
        doctor: { include: { user: { select: { name: true, email: true } } } },
        clinic: true, payment: true, prescription: true,
      },
    });
    if (!appointment) return res.status(404).json({ message: 'Appointment not found' });
    return res.json(appointment);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const updateAppointmentStatus = async (req, res) => {
  try {
    const { status } = req.body;
    if (!['CONFIRMED', 'REJECTED'].includes(status)) return res.status(400).json({ message: 'Invalid status' });

    const appointment = await prisma.appointment.update({
      where: { id: parseInt(req.params.id) },
      data: { status },
    });
    return res.json({ message: `Appointment ${status.toLowerCase()}`, appointment });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { bookAppointment, getAppointmentDetails, updateAppointmentStatus };
