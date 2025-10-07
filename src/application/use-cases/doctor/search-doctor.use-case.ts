import { Inject, Injectable } from '@nestjs/common';
import { ValidationException } from 'src/shared/execeptions/system/validation.exception';
import { Doctor } from 'src/infrastructure/database/models/doctor.models';
import { IDoctorRepository } from 'src/domain/interfaces/repositories/doctor/doctor.repository.interface';

@Injectable()
export class SearchDoctorUseCase {
  constructor(
    @Inject('IDoctorRepository') private readonly DoctorRepository: IDoctorRepository,
  ) {}

  // Buscar usuário por ID
  async findById(id: string): Promise<Doctor> {
    if (!id) {
      throw new ValidationException([
        {
          field: 'id',
          value: id,
          constraints: ['ID é obrigatório'],
        },
      ]);
    }

    const doctor = await this.DoctorRepository.findById(id);
    if (!doctor) {
      throw new DoctorNotFoundException();
    }

    return doctor;
  }

  async findAll(): Promise<Doctor[]> {
    const doctors = await this.DoctorRepository.findAll();
    return doctors;
  }
}
