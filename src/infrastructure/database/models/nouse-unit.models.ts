import { Nurse } from './nurse.models';
import { Unit } from './unit.models';

export class NurseUnit {
  id: string;
  nurseId: string;
  unitId: string;
  wardId?: string;
  isPrimary: boolean;
  isActive: boolean;
  createdAt: Date;

  // Relacionamentos
  nurse?: Nurse;
  unit?: Unit;
}
