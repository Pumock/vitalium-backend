import { Inject, Injectable } from '@nestjs/common';
import { DatabaseException } from 'src/shared/execeptions/system/database.exception';
import { IDoctorRepository } from 'src/domain/interfaces/repositories/doctor/doctor.repository.interface';

@Injectable()
export class DeleteDoctorUseCase {
  constructor(
    @Inject('IDoctorRepository') private readonly doctorRepository: IDoctorRepository,
  ) {}

  async execute(id: string): Promise<void> {
    const doctor = await this.doctorRepository.findById(id);
    if (!doctor) {
      throw new DoctorNotFoundException(`ID: ${id}`);
    }

    try {
      const doctor = await this.doctorRepository.delete(id);
      return doctor;
    } catch (error) {
      throw new DatabaseException('Erro ao deletar usuário', error);
    }
  }
}
