import { AdminRole } from '../../../shared/enums/admin-role.enum';
import { User } from './user.models';

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
