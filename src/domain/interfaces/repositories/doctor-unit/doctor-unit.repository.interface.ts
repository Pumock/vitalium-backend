import { DoctorUnit } from '../../../../infrastructure/database/models/doctor-unit.models';
import { CreateDoctorUnitDTO } from '../../../../presentation/dto/doctor-unitDTO/create-doctor-unit.dto';
import { UpdateDoctorUnitDTO } from '../../../../presentation/dto/doctor-unitDTO/update-doctor-unit.dto';

export interface IDoctorUnitRepository {
  create(data: CreateDoctorUnitDTO): Promise<DoctorUnit>;
  findById(id: string): Promise<DoctorUnit | null>;
  findByDoctorId(doctorId: string): Promise<DoctorUnit[]>;
  findByDoctorIdAndUnitId(
    doctorId: string,
    unitId: string,
  ): Promise<DoctorUnit | null>;
  update(id: string, data: UpdateDoctorUnitDTO): Promise<DoctorUnit>;
  delete(id: string): Promise<void>;
}
