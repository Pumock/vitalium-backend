import { AdmissionStatus } from '../../../shared/enums/admission-status.enum';
import { Patient } from './patient.models';
import { Ward } from './ward.models';

export class WardAdmission {
  id: string;
  patientId: string;
  wardId: string;
  admissionDate: string;
  dischargeDate?: string;
  reason: string;
  status: AdmissionStatus;
  notes?: string;
  createdAt: string;
  updatedAt: string;

  // Relacionamentos (carregados quando necessário)
  patient?: Patient;
  ward?: Ward;
}
