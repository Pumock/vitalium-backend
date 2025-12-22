import { Inject, Injectable } from '@nestjs/common';
import { IClinicRepository } from '../../../domain/interfaces/repositories/organizations/unit.repository.interface';
import { ClinicNotFoundException } from '../../../shared/execeptions/organizations/clinic-not-found.exception';
import { DatabaseException } from '../../../shared/execeptions/system/database.exception';
import {
  FieldError,
  ValidationException,
} from '../../../shared/execeptions/system/validation.exception';

@Injectable()
export class DeleteClinicUseCase {
  constructor(
    @Inject('IClinicRepository')
    private readonly clinicRepository: IClinicRepository,
  ) { }
  async execute(id: string): Promise<void> {
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

    const clinic = await this.clinicRepository.findById(id);
    if (!clinic) {
      throw new ClinicNotFoundException(
        `Nenhuma clínica foi encontrada com os critérios: ID: ${id}`,
      );
    }

    try {
      await this.clinicRepository.delete(id);
    } catch (error) {
      throw new DatabaseException('Erro ao deletar a clínica', error);
    }
  }
}
