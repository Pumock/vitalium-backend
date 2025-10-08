import { Inject, Injectable } from '@nestjs/common';
import {
  ValidationException,
  FieldError,
} from '../../../shared/execeptions/system/validation.exception';
import { IDoctorRepository } from '../../../domain/interfaces/repositories/doctor/doctor.repository.interface';
import { CreateDoctorDTO } from '../../../presentation/dto/doctorDTO/create-doctor.dto';
import { Doctor } from '../../../infrastructure/database/models/doctor.models';
import { DatabaseException } from '../../../shared/execeptions/system/database.exception';

@Injectable()
export class CreateDoctorUseCase {
  constructor(
    @Inject('IDoctorRepository')
    private readonly doctorRepository: IDoctorRepository,
  ) {}

  async execute(createDoctorDTO: CreateDoctorDTO): Promise<Doctor> {
    const errors: FieldError[] = [];

    if (!createDoctorDTO.crm) {
      errors.push({
        field: 'crm',
        value: createDoctorDTO.crm,
        constraints: ['Crm é obrigatório'],
      });
    }

    if (errors.length > 0) {
      throw new ValidationException(errors);
    }

    try {
      const doctor = await this.doctorRepository.create(createDoctorDTO);
      return doctor;
    } catch (error) {
      throw new DatabaseException('criar usuário', error);
    }
  }
}
