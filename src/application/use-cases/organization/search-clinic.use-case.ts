import { Inject, Injectable } from '@nestjs/common';
import { IClinicRepository } from '../../../domain/interfaces/repositories/organizations/unit.repository.interface';
import { Clinic } from '../../../infrastructure/database/models/clinic.models';
import { DatabaseException } from '../../../shared/execeptions/system/database.exception';
import {
  FieldError,
  ValidationException,
} from '../../../shared/execeptions/system/validation.exception';
import { ClinicNotFoundException } from '../../../shared/execeptions/organizations/clinic-not-found.exception';

@Injectable()
export class SearchClinicUseCase {
  constructor(
    @Inject('IClinicRepository')
    private readonly clinicRepository: IClinicRepository,
  ) { }
  async execute(id: string): Promise<Clinic> {
    const errors: FieldError[] = [];

    if (!id) {
      errors.push({
        field: 'id',
        value: id,
        constraints: ['ID é obrigatório'],
      });
    }

    if (errors.length > 0) {
      throw new ValidationException(errors);
    }

    try {
      const clinic = await this.clinicRepository.findById(id);

      if (!clinic) {
        throw new ClinicNotFoundException(
          `Nenhuma clínica foi encontrada com os critérios: ID: ${id}`,
        );
      }

      return clinic;
    } catch (error) {
      if (error instanceof ClinicNotFoundException) {
        throw error;
      }
      throw new DatabaseException('Erro ao buscar a clínica', error);
    }
  }
}
