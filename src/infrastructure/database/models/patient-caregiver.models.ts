import { Patient } from './patient.models';
import { Caregiver } from '../caregiver.models';

export class PatientCaregiver {
  id: string;
  patientId: string;
  caregiverId: string;
  isActive: boolean;
  createdAt: string;

  // Relacionamentos (carregados quando necessário)
  patient?: Patient;
  caregiver?: Caregiver;
}
