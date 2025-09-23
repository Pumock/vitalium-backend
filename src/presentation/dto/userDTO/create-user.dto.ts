import { IsBoolean, IsEmail, IsString } from 'class-validator';
import { Admin } from 'src/infrastructure/database/models/admin.models';
import { Caregiver } from 'src/infrastructure/database/models/caregiver.models';
import { Doctor } from 'src/infrastructure/database/models/doctor.models';
import { Nurse } from 'src/infrastructure/database/models/nurse.models';
import { Patient } from 'src/infrastructure/database/models/patient.models';
import { Role } from 'src/shared/enums';

export class CreateUserDTO {
  @IsEmail()
  email: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  phone?: string;

  @IsString()
  avatar?: string;

  @IsBoolean()
  isActive: boolean;

  @IsString()
  role: Role;

  @IsString()
  createdAt: string;

  @IsString()
  updatedAt: string;

  patient?: Patient;
  doctor?: Doctor;
  nurse?: Nurse;
  caregiver?: Caregiver;
  admin?: Admin;
}
