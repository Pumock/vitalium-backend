import { Inject, Injectable } from '@nestjs/common';
import { IClinicRepository } from '../../../domain/interfaces/repositories/organizations/unit.repository.interface';
import { Clinic } from '../../../infrastructure/database/models/clinic.models';
import { CreateClinicDTO } from '../../../presentation/dto/organizationDTO/create-organization.dto';
import { DatabaseException } from '../../../shared/execeptions/system/database.exception';
import {
  FieldError,
  ValidationException,
} from '../../../shared/execeptions/system/validation.exception';

@Injectable()
export class CreateClinicUseCase {
  constructor(
    @Inject('IClinicRepository')
    private readonly clinicRepository: IClinicRepository,
  ) { }
  async execute(createClinicDTO: CreateClinicDTO): Promise<Clinic> {
    const errors: FieldError[] = [];

    if (!createClinicDTO.name || createClinicDTO.name.trim() === '') {
      errors.push({
        field: 'name',
        value: createClinicDTO.name,
        constraints: ['Nome é obrigatório'],
      });
    }

    if (errors.length > 0) {
      throw new ValidationException(errors);
    }

    try {
      const clinic = await this.clinicRepository.create(createClinicDTO);
      return clinic;
    } catch (error) {
      throw new DatabaseException('Erro ao criar a clínica', error);
    }
  }
}
