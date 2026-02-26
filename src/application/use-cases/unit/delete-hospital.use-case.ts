// import { Inject, Injectable } from '@nestjs/common';
// import { IHospitalRepository } from '../../../domain/interfaces/repositories/organizations/hospital.repository.interface';
// import { HospitalNotFoundException } from '../../../shared/execeptions/organizations/hospital-not-found.exception';
// import { DatabaseException } from '../../../shared/execeptions/system/database.exception';
// import {
//   FieldError,
//   ValidationException,
// } from '../../../shared/execeptions/system/validation.exception';

// @Injectable()
// export class DeleteHospitalUseCase {
//   constructor(
//     @Inject('IHospitalRepository')
//     private readonly hospitalRepository: IHospitalRepository,
//   ) { }
//   async execute(id: string): Promise<void> {
//     const errors: FieldError[] = [];

//     if (!id) {
//       errors.push({
//         field: 'id',
//         value: id,
//         constraints: ['ID é obrigatório'],
//       });
//     }

//     if (errors.length > 0) {
//       throw new ValidationException(errors);
//     }

//     const hospital = await this.hospitalRepository.findById(id);
//     if (!hospital) {
//       throw new HospitalNotFoundException(`ID: ${id}`);
//     }

//     if (errors.length > 0) {
//       throw new ValidationException(errors);
//     }

//     try {
//       await this.hospitalRepository.delete(id);
//     } catch (error) {
//       throw new DatabaseException('Erro ao deletar a clínica', error);
//     }
//   }
// }
