import { DoctorUnit } from './doctor-unit.models';
import { DoctorSpecialization } from './doctor-specialization.models';
import { User } from './user.models';

export class Doctor {
  id: string;
  userId: string;
  crm: string;
  crmState: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;

  user?: User;
  units?: DoctorUnit[];
  specializations?: DoctorSpecialization[];
}
