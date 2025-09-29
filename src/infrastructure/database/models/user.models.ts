import { Role } from 'src/shared/enums/role.enum';
import { Caregiver } from './caregiver.models';
import { Nurse } from './nurse.models';
import { Doctor } from './doctor.models';
import { Patient } from './patient.models';
import { Admin } from './admin.models';

export class User {
  id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone?: string;
  avatar?: string;
  isActive: boolean;
  role: Role;
  createdAt: string;
  updatedAt: string;

  patient?: Patient;
  doctor?: Doctor;
  nurse?: Nurse;
  caregiver?: Caregiver;
  admin?: Admin;
}
