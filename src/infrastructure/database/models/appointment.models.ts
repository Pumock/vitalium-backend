import { AppointmentStatus } from '../../../shared/enums/appointment-status.enum';
import { AppointmentType } from '../../../shared/enums/appointment-type.enum';
import { Patient } from './patient.models';
import { Doctor } from './doctor.models';
import { Clinic } from './clinic.models';

export class Appointment {
  id: string;
  patientId: string;
  doctorId: string;
  clinicId?: string;
  title: string;
  description?: string;
  scheduledAt: string;
  duration: number; // minutos
  status: AppointmentStatus;
  type: AppointmentType;
  price?: number;
  notes?: string;
  createdAt: string;
  updatedAt: string;

  // Relacionamentos (carregados quando necessário)
  patient?: Patient;
  doctor?: Doctor;
  clinic?: Clinic;
}
