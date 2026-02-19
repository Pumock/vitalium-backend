import type { CaregiverRelationship } from '../../../shared/enums/caregiver-relationship.enum';
import type { PatientCaregiver } from './patient-caregiver.models';
import type { User } from './user.models';

export class Caregiver {
  id: string;
  userId: string;
  cpf: string;
  relationship: CaregiverRelationship;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;

  user?: User;
  patients?: PatientCaregiver[];
}
