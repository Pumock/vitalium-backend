import { Hospital } from '../../../../infrastructure/database/models/unit/unit.models';
import {
  CreateHospitalDTO,
  CreateHospitalWithClinicDTO,
} from '../../../../presentation/dto/organizationDTO/create-organization.dto';
import { UpdateHospitalDTO } from '../../../../presentation/dto/organizationDTO/update-organization.dto';

export interface IHospitalRepository {
  createWithClinic(
    createHospitalWithClinicDTO: CreateHospitalWithClinicDTO,
  ): Promise<Hospital>;
  create(createHospitalDTO: CreateHospitalDTO): Promise<Hospital>;
  findById(id: string): Promise<Hospital | null>;
  update(id: string, updateHospitalDTO: UpdateHospitalDTO): Promise<Hospital>;
  delete(id: string): Promise<void>;
}
