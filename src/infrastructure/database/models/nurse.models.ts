import { User } from './user.models';
import { Hospital } from './hospital.models';
import { Ward } from './ward.models';

export class Nurse {
  id: string;
  userId: string;
  coren: string;
  corenState: string;
  hospitalId?: string;
  wardId?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;

  // Relacionamentos (carregados quando necessário)
  user?: User;
  hospital?: Hospital;
  ward?: Ward;
}
