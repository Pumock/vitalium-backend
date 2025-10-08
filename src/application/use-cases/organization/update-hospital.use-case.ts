import { Inject, Injectable } from '@nestjs/common';
import { IHospitalRepository } from '../../../domain/interfaces/repositories/organizations/hospital.repository.interface';
import { Hospital } from '../../../infrastructure/database/models/hospital.models';
import { UpdateHospitalDTO } from '../../../presentation/dto/organizationDTO/update-organization.dto';
import { HospitalNotFoundException } from '../../../shared/execeptions/organizations/hospital-not-found.exception';
import { DatabaseException } from '../../../shared/execeptions/system/database.exception';
import {
  FieldError,
  ValidationException,
} from '../../../shared/execeptions/system/validation.exception';

@Injectable()
export class UpdateHospitalUseCase {
  constructor(
    @Inject('IHospitalRepository')
    private readonly hospitalRepository: IHospitalRepository,
  ) {}
  async execute(
    id: string,
    updateHospitalDTO: UpdateHospitalDTO,
  ): Promise<Hospital> {
    const errors: FieldError[] = [];

    if (!id) {
      errors.push({
        field: 'id',
        value: id,
        constraints: ['ID é obrigatório'],
      });
    }
    if (!updateHospitalDTO) {
      errors.push({
        field: 'updateHospitalDTO',
        value: updateHospitalDTO,
        constraints: ['Dados para atualização são obrigatórios'],
      });
    }
    if (errors.length > 0) {
      throw new ValidationException(errors);
    }

    const hospital = await this.hospitalRepository.findById(id);
    if (!hospital) {
      if (errors.length > 0) {
        throw new HospitalNotFoundException(`ID: ${id}`);
      }
    }

    try {
      const updatedHospital = await this.hospitalRepository.update(
        id,
        updateHospitalDTO,
      );
      return updatedHospital;
    } catch (error) {
      throw new DatabaseException('Erro ao atualizar o hospital', error);
    }
  }
}
