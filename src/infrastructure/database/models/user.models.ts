import type { Admin } from '@prisma/client';
import type { Role } from '../../../shared/enums';
import type { Caregiver } from './caregiver.models';
import type { Doctor } from './doctor.models';
import type { Nurse } from './nurse.models';
import type { Patient } from './patient.models';

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

  createdAt: Date;
  updatedAt: Date;

  patient?: Patient;
  doctor?: Doctor;
  nurse?: Nurse;
  caregiver?: Caregiver;
  admin?: Admin;
}
