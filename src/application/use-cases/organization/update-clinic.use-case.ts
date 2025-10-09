import { Inject, Injectable } from '@nestjs/common';
import { IClinicRepository } from '../../../domain/interfaces/repositories/organizations/clinic.repository.interface';
import { Clinic } from '../../../infrastructure/database/models/clinic.models';
import { UpdateClinicDTO } from '../../../presentation/dto/organizationDTO/update-organization.dto';
import { DatabaseException } from '../../../shared/execeptions/system/database.exception';
import {
  FieldError,
  ValidationException,
} from '../../../shared/execeptions/system/validation.exception';
import { ClinicNotFoundException } from '../../../shared/execeptions/organizations/clinic-not-found.exception';

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

    // Validação customizada para nome com apenas espaços
    if (
      updateClinicDTO.name !== undefined &&
      updateClinicDTO.name.trim() === ''
    ) {
      errors.push({
        field: 'name',
        value: updateClinicDTO.name,
        constraints: ['Nome é obrigatório'],
      });
    }

    if (errors.length > 0) {
      throw new ValidationException(errors);
    }

    const clinic = await this.clinicRepository.findById(id);
    if (!clinic) {
      throw new ClinicNotFoundException(
        `Nenhuma clínica foi encontrada com os critérios: ID: ${id}`,
      );
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
