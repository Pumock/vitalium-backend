import { Admin } from "@prisma/client";
import { Role } from "../../../../shared/enums";
import { Caregiver } from "./caregiver.models";
import { Doctor } from "./doctor.models";
import { Nurse } from "./nurse.models";
import { Patient } from "./patient.models";


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
