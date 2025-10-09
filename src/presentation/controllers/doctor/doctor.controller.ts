import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { DoctorResponseDTO } from '../../../presentation/dto/doctorDTO/response/doctor-response.dto';
import { CreateDoctorDTO } from '../../../presentation/dto/doctorDTO/create-doctor.dto';
import { UpdateDoctorDTO } from '../../../presentation/dto/doctorDTO/update-doctor.dto';
import { CreateDoctorUseCase } from '../../../application/use-cases/doctor/create-doctor.use-case';
import { SearchDoctorUseCase } from '../../../application/use-cases/doctor/search-doctor.use-case';
import { UpdateDoctorUseCase } from '../../../application/use-cases/doctor/update-doctor.use-case';
import { DeleteDoctorUseCase } from '../../../application/use-cases/doctor/delete-doctor.use-case';
import { ApiDoctorOperations } from '../../../shared/swagger/decorators';

@Controller('doctors')
export class DoctorController {
  constructor(
    private readonly createDoctorUseCase: CreateDoctorUseCase,
    private readonly searchDoctorUseCase: SearchDoctorUseCase,
    private readonly updateDoctorUseCase: UpdateDoctorUseCase,
    private readonly deleteDoctorUseCase: DeleteDoctorUseCase,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiDoctorOperations.createDoctor()
  async create(
    @Body() createDoctorDTO: CreateDoctorDTO,
  ): Promise<DoctorResponseDTO> {
    const doctor = await this.createDoctorUseCase.execute(createDoctorDTO);

    return plainToInstance(DoctorResponseDTO, doctor, {
      excludeExtraneousValues: true,
    });
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiDoctorOperations.findAllDoctors()
  async findAll(): Promise<DoctorResponseDTO[]> {
    const doctors = await this.searchDoctorUseCase.findAll();

    return plainToInstance(DoctorResponseDTO, doctors, {
      excludeExtraneousValues: true,
    });
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiDoctorOperations.findDoctorById()
  async findOne(@Param('id') id: string): Promise<DoctorResponseDTO> {
    const doctor = await this.searchDoctorUseCase.findById(id);

    return plainToInstance(DoctorResponseDTO, doctor, {
      excludeExtraneousValues: true,
    });
  }

  @Patch('/:id')
  @HttpCode(HttpStatus.OK)
  @ApiDoctorOperations.updateDoctor()
  async update(
    @Param('id') id: string,
    @Body() updateDoctorDTO: UpdateDoctorDTO,
  ): Promise<DoctorResponseDTO> {
    const doctor = await this.updateDoctorUseCase.execute(id, updateDoctorDTO);

    return plainToInstance(DoctorResponseDTO, doctor, {
      excludeExtraneousValues: true,
    });
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiDoctorOperations.deleteDoctor()
  async delete(@Param('id') id: string): Promise<void> {
    return this.deleteDoctorUseCase.execute(id);
  }
}
