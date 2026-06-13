const bcrypt = require('bcrypt');
const prisma = require('../prisma');
const { generateToken } = require('../utils/jwt');

const register = async (req, res) => {
  try {
    const { email, password, name, role, dob, gender, bloodGroup, specialization, treatmentType, experience, bio, doctorId } = req.body;

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) return res.status(400).json({ message: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: { email, password: hashedPassword, name, role },
    });

    if (role === 'PATIENT') {
      await prisma.patient.create({
        data: { userId: user.id, dob: new Date(dob), gender, bloodGroup },
      });
    } else if (role === 'DOCTOR') {
      await prisma.doctor.create({
        data: { userId: user.id, specialization, treatmentType, experience: parseInt(experience) || 0, bio: bio || '' },
      });
    } else if (role === 'ASSISTANT') {
      await prisma.assistant.create({
        data: { userId: user.id, doctorId: parseInt(doctorId) },
      });
    }

    const token = generateToken(user.id, user.role);
    return res.status(201).json({
      message: 'User registered successfully',
      token,
      user: { id: user.id, name: user.name, email: user.email, role: user.role },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    const token = generateToken(user.id, user.role);
    return res.json({
      message: 'Login successful',
      token,
      user: { id: user.id, name: user.name, email: user.email, role: user.role },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

module.exports = { register, login };
