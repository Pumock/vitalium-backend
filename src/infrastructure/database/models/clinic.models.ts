import { Appointment } from './appointment.models';
import { Doctor } from './doctor.models';
import { Hospital } from './hospital.models';

export class Clinic {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  phone: string;
  email: string;
  cnpj: string;
  hospitalId?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;

  // Relacionamentos (carregados quando necessário)
  hospital?: Hospital;
  doctors?: Doctor[];
  appointments?: Appointment[];
}
