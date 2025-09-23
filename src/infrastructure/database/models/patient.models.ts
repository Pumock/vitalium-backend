import { Gender } from '../../../shared/enums/gender.enum';
import { BloodType } from '../../../shared/enums/blood-type.enum';
import { User } from './user.models';
import { PatientCaregiver } from './patient-caregiver.models';
import { MedicalRecord } from './medical-record.models';
import { Appointment } from './appointment.models';
import { Prescription } from './prescription.models';
import { PatientDoctor } from './patient-doctor.models';
import { WardAdmission } from './ward-admission.models';

export class Patient {
  id: string;
  userId: string;
  cpf: string;
  rg?: string;
  birthDate: string;
  gender: Gender;
  bloodType?: BloodType;
  allergies?: string;
  emergencyContact?: string;
  emergencyPhone?: string;
  address?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;

  // Relacionamentos (carregados quando necessário)
  user?: User;
  caregivers?: PatientCaregiver[];
  medicalRecords?: MedicalRecord[];
  appointments?: Appointment[];
  prescriptions?: Prescription[];
  patientDoctors?: PatientDoctor[];
  wardAdmissions?: WardAdmission[];
}
