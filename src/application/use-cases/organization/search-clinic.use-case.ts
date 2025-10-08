import { Inject, Injectable } from '@nestjs/common';
import { IClinicRepository } from '../../../domain/interfaces/repositories/organizations/clinic.repository.interface';
import { Clinic } from '../../../infrastructure/database/models/clinic.models';
import { DatabaseException } from '../../../shared/execeptions/system/database.exception';
import {
  FieldError,
  ValidationException,
} from '../../../shared/execeptions/system/validation.exception';

@Injectable()
export class SearchClinicUseCase {
  constructor(
    @Inject('IClinicRepository')
    private readonly clinicRepository: IClinicRepository,
  ) {}
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
      return clinic;
    } catch (error) {
      throw new DatabaseException('Erro ao buscar a clínica', error);
    }
  }
}
