import { Unit } from '../../../../infrastructure/repositories/database/models/unit.models';
import { CreateUnitDTO } from '../../../../presentation/dto/unitDTO/create-unit.dto';
import { UpdateUnitDTO } from '../../../../presentation/dto/unitDTO/update-unit.dto';

export interface IUnitRepository {
  create(createUnitDTO: CreateUnitDTO): Promise<Unit>;
  findById(id: string): Promise<Unit | null>;
  findByCnpj(cnpj: string): Promise<Unit | null>;
  update(id: string, updateUnitDTO: UpdateUnitDTO): Promise<Unit>;
  delete(id: string): Promise<void>;
}
