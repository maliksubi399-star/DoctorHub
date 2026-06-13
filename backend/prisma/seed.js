const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding demo data...');

  // Create Admin
  const adminPassword = await bcrypt.hash('admin123', 10);
  await prisma.user.upsert({
    where: { email: 'admin@doctorhub.com' },
    update: {},
    create: { name: 'Admin User', email: 'admin@doctorhub.com', password: adminPassword, role: 'ADMIN' },
  });

  // Create Doctor
  const doctorPassword = await bcrypt.hash('doctor123', 10);
  const doctorUser = await prisma.user.upsert({
    where: { email: 'doctor@doctorhub.com' },
    update: {},
    create: { name: 'Dr. James Smith', email: 'doctor@doctorhub.com', password: doctorPassword, role: 'DOCTOR' },
  });
  const doctor = await prisma.doctor.upsert({
    where: { userId: doctorUser.id },
    update: {},
    create: { userId: doctorUser.id, specialization: 'General Physician', treatmentType: 'ALLOPATHIC', experience: 10, bio: 'Experienced general physician with over 10 years of practice.' },
  });
  await prisma.clinic.upsert({
    where: { id: 1 },
    update: {},
    create: { doctorId: doctor.id, name: 'City Health Clinic', address: '123 Main Street, City', timings: 'Mon-Sat 9am-5pm' },
  });

  // Create Doctor 2
  const doctor2Password = await bcrypt.hash('doctor123', 10);
  const doctor2User = await prisma.user.upsert({
    where: { email: 'doctor2@doctorhub.com' },
    update: {},
    create: { name: 'Dr. Aisha Khan', email: 'doctor2@doctorhub.com', password: doctor2Password, role: 'DOCTOR' },
  });
  await prisma.doctor.upsert({
    where: { userId: doctor2User.id },
    update: {},
    create: { userId: doctor2User.id, specialization: 'Homeopathic Specialist', treatmentType: 'HOMEOPATHIC', experience: 7, bio: 'Expert in homeopathic remedies for chronic conditions.' },
  });

  // Create Assistant
  const assistantPassword = await bcrypt.hash('assistant123', 10);
  const assistantUser = await prisma.user.upsert({
    where: { email: 'assistant@doctorhub.com' },
    update: {},
    create: { name: 'Sara Ahmed', email: 'assistant@doctorhub.com', password: assistantPassword, role: 'ASSISTANT' },
  });
  await prisma.assistant.upsert({
    where: { userId: assistantUser.id },
    update: {},
    create: { userId: assistantUser.id, doctorId: doctor.id },
  });

  // Create Patient
  const patientPassword = await bcrypt.hash('patient123', 10);
  const patientUser = await prisma.user.upsert({
    where: { email: 'patient@doctorhub.com' },
    update: {},
    create: { name: 'John Doe', email: 'patient@doctorhub.com', password: patientPassword, role: 'PATIENT' },
  });
  await prisma.patient.upsert({
    where: { userId: patientUser.id },
    update: {},
    create: { userId: patientUser.id, dob: new Date('1990-01-15'), gender: 'Male', bloodGroup: 'O+' },
  });

  console.log('✅ Seeding complete!');
  console.log('\n📋 Demo Accounts:');
  console.log('  Admin:     admin@doctorhub.com     / admin123');
  console.log('  Doctor:    doctor@doctorhub.com    / doctor123');
  console.log('  Assistant: assistant@doctorhub.com / assistant123');
  console.log('  Patient:   patient@doctorhub.com   / patient123');
}

main().catch(console.error).finally(() => prisma.$disconnect());
