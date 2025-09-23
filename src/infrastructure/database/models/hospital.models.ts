import { Clinic } from './clinic.models';
import { Doctor } from './doctor.models';
import { Nurse } from './nurse.models';
import { Ward } from './ward.models';

export class Hospital {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  phone: string;
  email: string;
  cnpj: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;

  // Relacionamentos (carregados quando necessário)
  clinics?: Clinic[];
  wards?: Ward[];
  doctors?: Doctor[];
  nurses?: Nurse[];
}
