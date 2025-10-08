import { Doctor } from '@prisma/client';
import { CreateDoctorDTO } from '../../../../presentation/dto/doctorDTO/create-doctor.dto';
import { UpdateDoctorDTO } from '../../../../presentation/dto/doctorDTO/update-doctor.dto';

export interface IDoctorRepository {
  // Métodos básicos
  create(createDoctorDTO: CreateDoctorDTO): Promise<Doctor>;
  findById(id: string): Promise<Doctor | null>;
  findAll(): Promise<Doctor[]>;
  update(id: string, updateData: UpdateDoctorDTO): Promise<Doctor>;
  delete(id: string): Promise<void>;
}
