import type { AdminRole } from '../../../shared/enums/admin-role.enum';
import type { User } from './user.models';

export class Admin {
  id: string;
  userId: string;
  role: AdminRole;
  permissions?: any;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;

  user?: User;
}
