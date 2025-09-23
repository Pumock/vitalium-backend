import { Exclude, Expose } from 'class-transformer';
import { Admin } from 'src/infrastructure/database/models/admin.models';
import { Caregiver } from 'src/infrastructure/database/models/caregiver.models';
import { Doctor } from 'src/infrastructure/database/models/doctor.models';
import { Nurse } from 'src/infrastructure/database/models/nurse.models';
import { Patient } from 'src/infrastructure/database/models/patient.models';
import { Role } from 'src/shared/enums';

export class UserResponseDTO {
  @Expose()
  email: string;

  @Expose()
  firstName: string;

  @Expose()
  lastName: string;

  @Expose()
  phone?: string;

  @Expose()
  avatar?: string;

  @Exclude()
  isActive: boolean;

  @Expose()
  role: Role;

  @Exclude()
  createdAt: string;

  @Exclude()
  updatedAt: string;

  patient?: Patient;
  doctor?: Doctor;
  nurse?: Nurse;
  caregiver?: Caregiver;
  admin?: Admin;
}
