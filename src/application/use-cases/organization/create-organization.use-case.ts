import { Inject, Injectable } from '@nestjs/common';
import { IHospitalRepository } from '../../../domain/interfaces/repositories/organizations/hospital.repository.interface';
import { Hospital } from '../../../infrastructure/database/models/unit/unit.models';
import { CreateHospitalWithClinicDTO } from '../../../presentation/dto/organizationDTO/create-organization.dto';
import { DatabaseException } from '../../../shared/execeptions/system/database.exception';
import {
  FieldError,
  ValidationException,
} from '../../../shared/execeptions/system/validation.exception';

@Injectable()
export class CreateOrganizationUseCase {
  constructor(
    @Inject('IHospitalRepository')
    private readonly hospitalRepository: IHospitalRepository,
  ) { }
  async execute(
    createHospitalWithClinicDTO: CreateHospitalWithClinicDTO,
  ): Promise<Hospital> {
    const errors: FieldError[] = [];

    if (
      !createHospitalWithClinicDTO.clinics ||
      createHospitalWithClinicDTO.clinics.length === 0
    ) {
      errors.push({
        field: 'clinic',
        value: createHospitalWithClinicDTO.clinics,
        constraints: ['Clínica é obrigatória'],
      });
    }

    if (errors.length > 0) {
      throw new ValidationException(errors);
    }

    try {
      const hospital = await this.hospitalRepository.createWithClinic(
        createHospitalWithClinicDTO,
      );
      return hospital;
    } catch (error) {
      throw new DatabaseException('Erro ao criar o hospital', error);
    }
  }
}
