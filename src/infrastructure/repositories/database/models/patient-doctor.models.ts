import type { Patient } from './patient.models';
import type { Doctor } from './doctor.models';

export class PatientDoctor {
  id: string;
  patientId: string;
  doctorId: string;
  startDate: Date;
  endDate?: Date;
  createdAt: Date;

  patient?: Patient;
  doctor?: Doctor;
}
