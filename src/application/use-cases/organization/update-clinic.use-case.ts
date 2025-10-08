import { Inject, Injectable } from '@nestjs/common';
import { IClinicRepository } from '../../../domain/interfaces/repositories/organizations/clinic.repository.interface';
import { Clinic } from '../../../infrastructure/database/models/clinic.models';
import { UpdateClinicDTO } from '../../../presentation/dto/organizationDTO/update-organization.dto';
import { DatabaseException } from '../../../shared/execeptions/system/database.exception';
import {
  FieldError,
  ValidationException,
} from '../../../shared/execeptions/system/validation.exception';

@Injectable()
export class UpdateClinicUseCase {
  constructor(
    @Inject('IClinicRepository')
    private readonly clinicRepository: IClinicRepository,
  ) {}
  async execute(id: string, updateClinicDTO: UpdateClinicDTO): Promise<Clinic> {
    const errors: FieldError[] = [];

    if (!id) {
      errors.push({
        field: 'id',
        value: id,
        constraints: ['ID é obrigatório'],
      });
    }
    if (!updateClinicDTO) {
      errors.push({
        field: 'updateClinicDTO',
        value: updateClinicDTO,
        constraints: ['Dados para atualização são obrigatórios'],
      });
    }
    if (errors.length > 0) {
      throw new ValidationException(errors);
    }

    try {
      const updatedClinic = await this.clinicRepository.update(
        id,
        updateClinicDTO,
      );
      return updatedClinic;
    } catch (error) {
      throw new DatabaseException('Erro ao atualizar a clínica', error);
    }
  }
}
