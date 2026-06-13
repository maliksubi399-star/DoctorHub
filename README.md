# 🏥 Doctor Hub

> A production-ready healthcare consultation and patient history management system with role-based access control, appointment workflows, and secure medical record handling.

<img width="1092" height="541" alt="image" src="https://github.com/user-attachments/assets/7341e454-b9ae-4315-a000-64cd1ce4fe48" />
<img width="1094" height="509" alt="image" src="https://github.com/user-attachments/assets/83d389af-b7a3-4c50-adc1-68496df92c5f" />
<img width="1092" height="537" alt="image" src="https://github.com/user-attachments/assets/bc495802-20c3-40fd-bead-9451fe6c1dd4" />
<img width="1097" height="509" alt="image" src="https://github.com/user-attachments/assets/6195f405-054a-45f3-ab7f-7d7552b28d26" />

---

## 📌 Table of Contents

- [About the Project](#about-the-project)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [User Roles](#user-roles)
- [Appointment Workflow](#appointment-workflow)
- [Database Schema](#database-schema)
- [API Endpoints](#api-endpoints)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Project Structure](#project-structure)
- [Security](#security)
- [Future Enhancements](#future-enhancements)
- [License](#license)

---

## 📖 About the Project

**Doctor Hub** is a full-stack healthcare platform that connects patients with Allopathic, Homeopathic, and Herbal doctors. Patients can search doctors by disease or treatment type, book appointments, upload payment proof, and manage their complete medical history — all in one place.

The system enforces strict medical record rules: history cannot be deleted, prescriptions cannot be edited, and all appointments go through a verified payment workflow before confirmation.

---

## ✨ Features

- 🔍 **Doctor Search & Filtering** — Search by disease, specialization, and treatment type
- 📅 **Appointment Booking** — Full slot-based booking system with status tracking
- 💳 **Payment Verification** — Screenshot upload and assistant-based manual verification
- 📋 **Medical History Management** — Immutable records, append-only prescriptions
- 👨‍⚕️ **Doctor Dashboard** — Schedule management, clinic setup, prescription writing
- 🔐 **Role-Based Access Control** — 5 distinct roles with protected routes
- 🔒 **Secure Authentication** — JWT + bcrypt with token expiry
- 📊 **Admin Analytics** — Reports on doctors, appointments, and payments
- 🌑 **Dark Mode UI** — Deep navy/charcoal theme throughout

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React.js, Tailwind CSS |
| Backend | Node.js, Express.js |
| Database | PostgreSQL / MySQL |
| Auth | JWT, bcrypt |
| File Uploads | Multer |
| Validation | Express-validator |

---

## 👥 User Roles

| Role | Capabilities |
|------|-------------|
| **Patient** | Search doctors, book appointments, upload payment, view history |
| **Doctor** | Manage clinics/schedules, write prescriptions, view shared history |
| **Assistant** | Verify payments, confirm or reject appointments |
| **Admin** | Manage doctors and users, view analytics |
| **Super Admin** | Full system control |

---

## 🔄 Appointment Workflow

```
Patient searches doctor
        ↓
Selects time slot & books → status: PENDING
        ↓
Uploads payment screenshot → status: PAYMENT_UPLOADED
        ↓
Assistant verifies payment → status: CONFIRMED / REJECTED
        ↓
Patient & Doctor notified
```

---

## 🗄️ Database Schema

```sql
users           → id, name, email, password, role, created_at
patients        → id, user_id (FK), dob, gender, blood_group
doctors         → id, user_id (FK), specialization, treatment_type, experience, bio
assistants      → id, user_id (FK), doctor_id (FK)
clinics         → id, doctor_id (FK), name, address, timings
appointments    → id, patient_id, doctor_id, clinic_id, date, time, status
payments        → id, appointment_id, screenshot_url, verified_by, status
prescriptions   → id, appointment_id, doctor_id, details, created_at
medical_history → id, patient_id, doctor_id, notes, created_at
```

---

## 📡 API Endpoints

### Auth
```
POST   /api/auth/register          Register (any role)
POST   /api/auth/login             Login + JWT token
POST   /api/auth/forgot-password   Password reset link
```

### Doctors
```
GET    /api/doctors                List all (filter by disease, treatment_type)
GET    /api/doctors/:id            Doctor profile
POST   /api/doctors/clinic         Add clinic (Doctor only)
POST   /api/doctors/schedule       Set schedule (Doctor only)
```

### Appointments
```
POST   /api/appointments              Book appointment (Patient)
GET    /api/appointments/:id          Get appointment details
PATCH  /api/appointments/:id/status   Confirm/reject (Assistant)
```

### Payments
```
POST   /api/payments              Upload payment screenshot (Patient)
PATCH  /api/payments/:id/verify   Verify payment (Assistant)
```

### Medical Records
```
GET    /api/history               View patient history
POST   /api/history               Add record (Doctor only)
POST   /api/prescriptions         Add prescription (Doctor only)
GET    /api/prescriptions/:pid    View prescriptions
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js v18+
- PostgreSQL or MySQL
- npm or yarn

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/your-username/doctor-hub.git
cd doctor-hub

# 2. Install backend dependencies
cd backend
npm install

# 3. Install frontend dependencies
cd ../frontend
npm install

# 4. Set up environment variables
cp .env.example .env
# Fill in your values in .env

# 5. Run database migrations
cd ../backend
npm run migrate

# 6. Seed demo data (optional)
npm run seed

# 7. Start the backend server
npm run dev

# 8. Start the frontend (in a new terminal)
cd ../frontend
npm start
```

The app will be running at `http://localhost:3000` and the API at `http://localhost:5000`.

---

## 🔑 Environment Variables

Create a `.env` file in the `/backend` directory:

```env
# Server
PORT=5000
NODE_ENV=development

# Database
DB_HOST=localhost
DB_PORT=5432
DB_NAME=doctor_hub
DB_USER=your_db_user
DB_PASSWORD=your_db_password

# JWT
JWT_SECRET=your_super_secret_key
JWT_EXPIRES_IN=7d

# File Upload
UPLOAD_PATH=./uploads
MAX_FILE_SIZE=5mb
```

---

## 📁 Project Structure

```
doctor-hub/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── doctorController.js
│   │   ├── appointmentController.js
│   │   ├── paymentController.js
│   │   └── historyController.js
│   ├── middleware/
│   │   ├── auth.js           # JWT verification
│   │   ├── roleGuard.js      # RBAC enforcement
│   │   └── validate.js       # Input validation
│   ├── models/
│   ├── routes/
│   ├── migrations/
│   ├── seeders/
│   └── server.js
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── Doctors.jsx
│   │   │   ├── BookAppointment.jsx
│   │   │   └── dashboards/
│   │   ├── components/
│   │   ├── context/
│   │   └── App.jsx
│   └── tailwind.config.js
│
├── .env.example
├── postman_collection.json
└── README.md
```

---

## 🔒 Security

- ✅ JWT authentication with expiry
- ✅ Passwords hashed with bcrypt (10+ salt rounds)
- ✅ Role-based middleware on every protected route
- ✅ Input validation and sanitization
- ✅ Medical records are append-only — no deletions allowed
- ✅ Patients can only access their own records
- ✅ Doctors can only view history of patients who have booked with them

---

## 🔮 Future Enhancements

- 🤖 AI-powered disease prediction and doctor suggestion
- 📹 Video consultation via WebRTC
- 📲 WhatsApp / SMS notifications
- 📄 E-prescription PDF generation and download

---

## 👨‍💻 Author

**Your Name**
- GitHub: [@your-username](https://github.com/your-username)
- LinkedIn: [your-linkedin](https://linkedin.com/in/your-linkedin)

---

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---
