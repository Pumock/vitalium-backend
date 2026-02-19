import type { WardType } from '../../../shared/enums/ward-type.enum';
import type { Nurse } from './nurse.models';
import type { Unit } from './unit.models';
import type { WardAdmission } from './ward-admission.models';

export class Ward {
  id: string;
  unitId: string;
  name: string;
  wardType: WardType;
  capacity: number;
  currentOccupancy: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;

  // Relacionamentos (carregados quando necessário)
  unit?: Unit;
  nurses?: Nurse[];
  admissions?: WardAdmission[];
}
