import { WardType } from '../../../shared/enums/ward-type.enum';
import { Hospital } from './hospital.models';
import { Nurse } from './nurse.models';
import { WardAdmission } from './ward-admission.models';

export class Ward {
  id: string;
  hospitalId: string;
  name: string;
  wardType: WardType;
  capacity: number;
  currentOccupancy: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;

  // Relacionamentos (carregados quando necessário)
  hospital?: Hospital;
  nurses?: Nurse[];
  admissions?: WardAdmission[];
}
