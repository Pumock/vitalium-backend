import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { CreateDoctorUnitUseCase } from '../../../application/use-cases/doctor-unit/create-doctor-unit.use-case';
import { ApiDoctorUnitOperations } from '../../../shared/swagger/decorators/doctor-unit.decorators';
import { CreateDoctorUnitDTO } from '../../dto/doctor-unitDTO/create-doctor-unit.dto';
import { DoctorUnitResponseDTO } from '../../dto/doctor-unitDTO/response/doctor-unit-reponse.dto';
import { plainToInstance } from 'class-transformer';

@Controller('doctor-units')
export class DoctorUnitController {
  constructor(
    private readonly createDoctorUnitUseCase: CreateDoctorUnitUseCase,
  ) { }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiDoctorUnitOperations.createDoctorUnit()
  async create(
    @Body() createDoctorUnitDTO: CreateDoctorUnitDTO,
  ): Promise<DoctorUnitResponseDTO> {
    const doctorUnit =
      await this.createDoctorUnitUseCase.execute(createDoctorUnitDTO);

    return plainToInstance(DoctorUnitResponseDTO, doctorUnit, {
      excludeExtraneousValues: true,
    });
  }
}
