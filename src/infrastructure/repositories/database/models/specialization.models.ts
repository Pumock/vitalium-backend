import type { DoctorSpecialization } from './doctor-specialization.models';

export class Specialization {
  id: string;
  name: string;
  description?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;

  doctors?: DoctorSpecialization[];
}
