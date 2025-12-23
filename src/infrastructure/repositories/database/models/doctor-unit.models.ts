import { Doctor } from './doctor.models';
import { Unit } from './unit.models';

export class DoctorUnit {
  id: string;
  doctorId: string;
  unitId: string;
  consultationPrice?: number;
  isPrimary: boolean;
  isActive: boolean;
  createdAt: Date;

  doctor?: Doctor;
  unit?: Unit;
}
