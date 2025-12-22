import { AppointmentStatus } from '../../../shared/enums/appointment-status.enum';
import { AppointmentType } from '../../../shared/enums/appointment-type.enum';
import { Patient } from './patient.models';
import { Doctor } from './doctor.models';
import { Unit } from './unit.models';

export class Appointment {
  id: string;
  patientId: string;
  doctorId: string;
  unitId?: string;
  title: string;
  description?: string;
  scheduledAt: string;
  duration: number;
  status: AppointmentStatus;
  type: AppointmentType;
  price?: number;
  notes?: string;
  createdAt: string;
  updatedAt: string;

  patient?: Patient;
  doctor?: Doctor;
  unit?: Unit;
}
