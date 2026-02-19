import type { NurseUnit } from './nouse-unit.models';
import type { User } from './user.models';

export class Nurse {
  id: string;
  userId: string;
  coren: string;
  corenState: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;

  // Relacionamentos
  user?: User;
  units?: NurseUnit[];
}
