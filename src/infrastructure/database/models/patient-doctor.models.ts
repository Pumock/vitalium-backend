import { Patient } from './patient.models';
import { Doctor } from './doctor.models';

export class PatientDoctor {
  id: string;
  patientId: string;
  doctorId: string;
  isActive: boolean;
  startDate: string;
  endDate?: string;
  createdAt: string;

  // Relacionamentos (carregados quando necessário)
  patient?: Patient;
  doctor?: Doctor;
}
