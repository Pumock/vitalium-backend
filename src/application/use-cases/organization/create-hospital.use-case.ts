import { Inject, Injectable } from '@nestjs/common';
import { IHospitalRepository } from '../../../domain/interfaces/repositories/organizations/hospital.repository.interface';
import { Hospital } from '../../../infrastructure/database/models/unit/unit.models';
import { CreateHospitalDTO } from '../../../presentation/dto/organizationDTO/create-organization.dto';
import { DatabaseException } from '../../../shared/execeptions/system/database.exception';
import {
  FieldError,
  ValidationException,
} from '../../../shared/execeptions/system/validation.exception';

@Injectable()
export class CreateHospitalUseCase {
  constructor(
    @Inject('IHospitalRepository')
    private readonly hospitalRepository: IHospitalRepository,
  ) { }
  async execute(createHospitalDTO: CreateHospitalDTO): Promise<Hospital> {
    const errors: FieldError[] = [];

    if (!createHospitalDTO.name) {
      errors.push({
        field: 'name',
        value: createHospitalDTO.name,
        constraints: ['Nome é obrigatório'],
      });
    }

    if (errors.length > 0) {
      throw new ValidationException(errors);
    }

    try {
      const hospital = await this.hospitalRepository.create(createHospitalDTO);
      return hospital;
    } catch (error) {
      throw new DatabaseException('Erro ao criar o hospital', error);
    }
  }
}
