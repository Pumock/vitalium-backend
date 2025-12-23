import { Unit } from '@prisma/client';
import { Patient } from './patient.models';

export class PatientUnit {
  id: string;
  patientId: string;
  unitId: string;

  isPrimary: boolean;
  isActive: boolean;
  createdAt: Date;

  patient?: Patient;
  unit?: Unit;
}
