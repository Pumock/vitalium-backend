import { CaregiverRelationship } from '../../shared/enums/caregiver-relationship.enum';
import { PatientCaregiver } from './models/patient-caregiver.models';
import { User } from '../core/user.models';

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
