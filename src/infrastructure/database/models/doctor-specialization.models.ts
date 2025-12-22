import { Doctor } from './doctor.models';
import { Specialization } from './specialization.models';

export class DoctorSpecialization {
  id: string;
  doctorId: string;
  specializationId: string;
  createdAt: string;

  doctor?: Doctor;
  specialization?: Specialization;
}
