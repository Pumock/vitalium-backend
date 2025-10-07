import { Inject, Injectable } from '@nestjs/common';
import {
  ValidationException,
  FieldError,
} from 'src/shared/execeptions/system/validation.exception';
import { DatabaseException } from 'src/shared/execeptions/system/database.exception';
import { Doctor } from 'src/infrastructure/database/models/doctor.models';
import { IDoctorRepository } from 'src/domain/interfaces/repositories/doctor/doctor.repository.interface';
import { UpdateDoctorDTO } from 'src/presentation/dto/doctorDTO/update-doctor.dto';

@Injectable()
export class UpdateDoctorUseCase {
  constructor(
    @Inject('IDoctorRepository') private readonly doctorRepository: IDoctorRepository,
  ) {}

  async execute(id: string, updateDoctorDTO: UpdateDoctorDTO): Promise<Doctor> {
    const errors: FieldError[] = [];

    if (!updateDoctorDTO.crm) {
      errors.push({
        field: 'crm',
        value: updateDoctorDTO.crm,
        constraints: ['Crm é obrigatório'],
      });
    }

    if (errors.length > 0) {
      throw new ValidationException(errors);
    }

    try {
      const updatedDoctor = await this.doctorRepository.update(id, updateDoctorDTO);
      return updatedDoctor;
    } catch (error) {
      throw new DatabaseException('criar usuário', error);
    }
  }
}
