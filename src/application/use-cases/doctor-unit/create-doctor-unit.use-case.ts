import { Inject, Injectable } from '@nestjs/common';
import { ValidationException, FieldError } from '../../../shared/execeptions/system/validation.exception';
import { IDoctorRepository } from '../../../domain/interfaces/repositories/doctor/doctor.repository.interface';
import { DatabaseException } from '../../../shared/execeptions/system/database.exception';
import { CreateDoctorUnitDTO } from '../../../presentation/dto/doctor-unitDTO/create-doctor-unit.dto';
import { IDoctorUnitRepository } from '../../../domain/interfaces/repositories/doctor-unit/doctor-unit.repository.interface';
import { IUnitRepository } from '../../../domain/interfaces/repositories/units/unit.repository.interface';
import { UnitInvalidException } from '../../../shared/execeptions/units/unit-invalid.exception';
import { DoctorUnit } from '../../../infrastructure/database/models/doctor-unit.models';

@Injectable()
export class CreateDoctorUnitUseCase {
    constructor(
        @Inject('IDoctorUnitRepository')
        private readonly doctorUnitRepository: IDoctorUnitRepository,

        @Inject('IDoctorRepository')
        private readonly doctorRepository: IDoctorRepository,

        @Inject('IUnitRepository')
        private readonly unitRepository: IUnitRepository,
    ) { }

    async execute(
        createDoctorUnitDTO: CreateDoctorUnitDTO,
    ): Promise<DoctorUnit> {
        const errors: FieldError[] = [];

        if (
            createDoctorUnitDTO.consultationPrice === undefined ||
            createDoctorUnitDTO.consultationPrice <= 0
        ) {
            errors.push({
                field: 'consultationPrice',
                value: createDoctorUnitDTO.consultationPrice,
                constraints: ['Preço da consulta é obrigatório'],
            });
        }

        if (errors.length > 0) {
            throw new ValidationException(errors);
        }

        try {
            const doctor = await this.doctorRepository.findById(
                createDoctorUnitDTO.doctorId,
            );

            if (!doctor) {
                throw new ValidationException([
                    {
                        field: 'doctorId',
                        value: createDoctorUnitDTO.doctorId,
                        constraints: ['Médico não encontrado'],
                    },
                ]);
            }

            const unit = await this.unitRepository.findById(
                createDoctorUnitDTO.unitId,
            );

            if (!unit || unit.isActive === false) {
                throw new UnitInvalidException(createDoctorUnitDTO.unitId);
            }

            return await this.doctorUnitRepository.create(createDoctorUnitDTO);
        } catch (error) {
            if (
                error instanceof ValidationException ||
                error instanceof UnitInvalidException
            ) {
                throw error;
            }

            throw new DatabaseException('criar associação médico-unidade', error);
        }
    }
}
