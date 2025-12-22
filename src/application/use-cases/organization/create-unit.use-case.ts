import { Inject, Injectable } from '@nestjs/common';
import { DatabaseException } from '../../../shared/execeptions/system/database.exception';
import {
  FieldError,
  ValidationException,
} from '../../../shared/execeptions/system/validation.exception';
import { CreateUnitDTO } from '../../../presentation/dto/organizationDTO/create-unit.dto';
import { IUnitRepository } from '../../../domain/interfaces/repositories/organizations/unit.repository.interface';
import { Unit } from '../../../infrastructure/database/models/unit.models';
import { UnitAlreadyExistsException } from '../../../shared/execeptions/organizations/unit-already-exists.exception';

@Injectable()
export class CreateUnitUseCase {
  constructor(
    @Inject('IUnitRepository')
    private readonly unitRepository: IUnitRepository,
  ) { }
  async execute(
    createUnitDTO: CreateUnitDTO,
  ): Promise<Unit> {
    const errors: FieldError[] = [];

    if (errors.length > 0) {
      throw new ValidationException(errors);
    }

    const unitExisting = await this.unitRepository.findByCnpj(createUnitDTO.cnpj)

    if (unitExisting) {
      throw new UnitAlreadyExistsException(createUnitDTO.cnpj)
    }


    try {
      const unit = await this.unitRepository.create(
        createUnitDTO,
      );
      return unit;
    } catch (error) {
      throw new DatabaseException('Erro ao criar a unidade', error);
    }
  }
}
