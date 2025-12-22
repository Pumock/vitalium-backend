import { Inject, Injectable } from '@nestjs/common';
import {
  ValidationException,
  FieldError,
} from '../../../shared/execeptions/system/validation.exception';
import { IDoctorRepository } from '../../../domain/interfaces/repositories/doctor/doctor.repository.interface';
import { IUserRepository } from '../../../domain/interfaces/repositories/user/user.repository.interface';
import { CreateDoctorDTO } from '../../../presentation/dto/doctorDTO/create-doctor.dto';
import { Doctor } from '../../../infrastructure/database/models/doctor.models';
import { DatabaseException } from '../../../shared/execeptions/system/database.exception';
import { Role } from '../../../shared/enums/role.enum';

@Injectable()
export class CreateDoctorUseCase {
  constructor(
    @Inject('IDoctorRepository')
    private readonly doctorRepository: IDoctorRepository,
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
  ) { }

  async execute(createDoctorDTO: CreateDoctorDTO): Promise<Doctor> {
    const errors: FieldError[] = [];

    // Validação básica
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
      // Verificar se o usuário existe
      let user = null;
      if (createDoctorDTO.userId) {
        user = await this.userRepository.findById(createDoctorDTO.userId);
        if (!user) {
          throw new ValidationException([
            {
              field: 'userId',
              value: createDoctorDTO.userId,
              constraints: ['Usuário não encontrado'],
            },
          ]);
        }
      }

      // Verificar se o usuário tem o role correto
      if (user && user.role !== Role.DOCTOR) {
        throw new ValidationException([
          {
            field: 'user.role',
            value: user.role,
            constraints: ['Usuário deve ter o role DOCTOR'],
          },
        ]);
      }

      // Criar o médico com o usuário existente
      const doctorData = {
        ...createDoctorDTO,
        user: user,
      };

      const doctor = await this.doctorRepository.create(doctorData);
      return doctor;
    } catch (error) {
      if (error instanceof ValidationException) {
        throw error;
      }
      throw new DatabaseException('criar médico', error);
    }
  }
}
