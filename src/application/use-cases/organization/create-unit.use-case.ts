import { Inject, Injectable } from '@nestjs/common';
import { DatabaseException } from '../../../shared/execeptions/system/database.exception';
import {
  FieldError,
  ValidationException,
} from '../../../shared/execeptions/system/validation.exception';
import { CreateUnitDTO } from '../../../presentation/dto/organizationDTO/create-organization.dto';
import { IUnitRepository } from '../../../domain/interfaces/repositories/organizations/unit.repository.interface';
import { Unit } from '../../../infrastructure/database/models/unit.models';

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
