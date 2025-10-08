import { Clinic } from '../../../../infrastructure/database/models/clinic.models';
import { CreateClinicDTO } from '../../../../presentation/dto/organizationDTO/create-organization.dto';
import { UpdateClinicDTO } from '../../../../presentation/dto/organizationDTO/update-organization.dto';

export interface IClinicRepository {
  create(createClinicDTO: CreateClinicDTO): Promise<Clinic>;
  findById(id: string): Promise<Clinic | null>;
  update(id: string, updateClinicDTO: UpdateClinicDTO): Promise<Clinic>;
  delete(id: string): Promise<void>;
}
