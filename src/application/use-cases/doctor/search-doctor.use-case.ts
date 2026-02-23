import { Inject, Injectable } from '@nestjs/common';
import { ValidationException } from '../../../shared/execeptions/system/validation.exception';
import { DoctorNotFoundException } from '../../../shared/execeptions/doctor/doctor-not-found.exception';
import type { Doctor } from '../../../infrastructure/database/models/doctor.models';
import type { IDoctorRepository } from '../../../domain/interfaces/repositories/doctor/doctor.repository.interface';

@Injectable()
export class SearchDoctorUseCase {
  constructor(
    @Inject('IDoctorRepository')
    private readonly DoctorRepository: IDoctorRepository,
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
      throw new DoctorNotFoundException(`ID: ${id}`);
    }

    return doctor;
  }

  async findAll(): Promise<Doctor[]> {
    const doctors = await this.DoctorRepository.findAll();

    if (!doctors || doctors.length === 0) {
      throw new DoctorNotFoundException();
    }

    return doctors;
  }
}
