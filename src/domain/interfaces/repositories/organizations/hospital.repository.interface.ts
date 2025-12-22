import { Unit } from "../../../../infrastructure/database/models/unit.models";
import { CreateUnitDTO } from "../../../../presentation/dto/organizationDTO/create-unit.dto";
import { UpdateUnitDTO } from "../../../../presentation/dto/organizationDTO/update-unit.dto";

export interface IUnitepository {
  create(createUnitDTO: CreateUnitDTO): Promise<Unit>;
  findById(id: string): Promise<Unit | null>;
  update(id: string, updateUnitDTO: UpdateUnitDTO): Promise<Unit>;
  delete(id: string): Promise<void>;
}
