import { User } from './user.models';
import { Hospital } from './hospital.models';
import { Clinic } from './clinic.models';
import { DoctorSpecialization } from './doctor-specialization.models';
import { MedicalRecord } from './medical-record.models';
import { Appointment } from './appointment.models';
import { Prescription } from './prescription.models';
import { PatientDoctor } from './patient-doctor.models';

export class Doctor {
  id: string;
  userId: string;
  crm: string;
  crmState: string;
  hospitalId?: string;
  clinicId?: string;
  consultationPrice?: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;

  // Relacionamentos (carregados quando necessário)
  user?: User;
  hospital?: Hospital;
  clinic?: Clinic;
  specializations?: DoctorSpecialization[];
  medicalRecords?: MedicalRecord[];
  appointments?: Appointment[];
  prescriptions?: Prescription[];
  patientDoctors?: PatientDoctor[];
}
