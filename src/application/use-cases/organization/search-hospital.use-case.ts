import { Inject, Injectable } from '@nestjs/common';
import { IHospitalRepository } from '../../../domain/interfaces/repositories/organizations/hospital.repository.interface';
import { Hospital } from '../../../infrastructure/database/models/unit/unit.models';
import { DatabaseException } from '../../../shared/execeptions/system/database.exception';
import {
  FieldError,
  ValidationException,
} from '../../../shared/execeptions/system/validation.exception';
import { HospitalNotFoundException } from '../../../shared/execeptions/organizations/hospital-not-found.exception';

@Injectable()
export class SearchHospitalUseCase {
  constructor(
    @Inject('IHospitalRepository')
    private readonly hospitalRepository: IHospitalRepository,
  ) { }
  async execute(id: string): Promise<Hospital> {
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
      const hospital = await this.hospitalRepository.findById(id);

      if (!hospital) {
        throw new HospitalNotFoundException(
          `Nenhum hospital foi encontrado com os critérios: ID: ${id}`,
        );
      }

      return hospital;
    } catch (error) {
      if (error instanceof HospitalNotFoundException) {
        throw error;
      }
      throw new DatabaseException('Erro ao buscar o hospital', error);
    }
  }
}
