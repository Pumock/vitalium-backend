import { DoctorUnit } from '../../../../infrastructure/database/models/doctor-unit.models';
import { CreateDoctorUnitDTO } from '../../../../presentation/dto/doctorDTO/create-doctor-unit.dto';
import { UpdateDoctorUnitDTO } from '../../../../presentation/dto/doctorDTO/update-doctor-unit.dto';

export interface IDoctorUnitRepository {
    create(data: CreateDoctorUnitDTO): Promise<DoctorUnit>;
    findById(id: string): Promise<DoctorUnit | null>;
    findByDoctorId(doctorId: string): Promise<DoctorUnit[]>;
    update(id: string, data: UpdateDoctorUnitDTO): Promise<DoctorUnit>;
    delete(id: string): Promise<void>;
}
