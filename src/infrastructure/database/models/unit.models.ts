import { UnitType } from "../../../shared/enums/unit.enum";
import { DoctorUnit } from "./doctor-unit.models";
import { NurseUnit } from "./nouse-unit.models";
import { PatientUnit } from "./patient-unit.models";

export class Unit {
  id: string;
  name: string;
  type: UnitType
  cnpj?: string;
  phone?: string;
  email?: string;
  address?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;

  // Relacionamentos
  doctors?: DoctorUnit[];
  nurses?: NurseUnit[];
  patients?: PatientUnit[];
}
