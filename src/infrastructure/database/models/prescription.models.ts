import { Patient } from './patient.models';
import { Doctor } from './doctor.models';

export class Prescription {
  id: string;
  patientId: string;
  doctorId: string;
  medications: any; // JSON com array de medicamentos
  instructions?: string;
  validUntil?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;

  // Relacionamentos (carregados quando necessário)
  patient?: Patient;
  doctor?: Doctor;
}
