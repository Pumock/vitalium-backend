import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import {
  CreateClinicDTO,
  CreateHospitalDTO,
  CreateHospitalWithClinicDTO,
} from '../../dto/organizationDTO/create-organization.dto';
import {
  UpdateClinicDTO,
  UpdateHospitalDTO,
} from '../../dto/organizationDTO/update-organization.dto';
import { plainToInstance } from 'class-transformer';
import {
  ResponseClinicDTO,
  ResponseHospitalDTO,
  ResponseOrganizationDTO,
} from '../../dto/organizationDTO/response/organization-response.dto';
import { CreateHospitalUseCase } from 'src/application/use-cases/organization/create-hospital.use-case';
import { CreateClinicUseCase } from 'src/application/use-cases/organization/create-clinic.use-case';
import { DeleteHospitalUseCase } from 'src/application/use-cases/organization/delete-hospital.use-case';
import { DeleteClinicUseCase } from 'src/application/use-cases/organization/delete-clinic.use-case';
import { CreateOrganizationUseCase } from 'src/application/use-cases/organization/create-organization.use-case';
import { SearchHospitalUseCase } from 'src/application/use-cases/organization/search-hospital.use-case';
import { UpdateHospitalUseCase } from 'src/application/use-cases/organization/update-hospital.use-case';
import { SearchClinicUseCase } from 'src/application/use-cases/organization/search-clinic.use-case';
import { UpdateClinicUseCase } from 'src/application/use-cases/organization/update-clinic.use-case';

@Controller('organizations')
export class OrganizationController {
  constructor(
    private readonly createOrganizationUseCase: CreateOrganizationUseCase,
    private readonly createHospitalUseCase: CreateHospitalUseCase,
    private readonly searchHospitalUseCase: SearchHospitalUseCase,
    private readonly updateHospitalUseCase: UpdateHospitalUseCase,
    private readonly deleteHospitalUseCase: DeleteHospitalUseCase,
    private readonly createClinicUseCase: CreateClinicUseCase,
    private readonly searchClinicUseCase: SearchClinicUseCase,
    private readonly updateClinicUseCase: UpdateClinicUseCase,
    private readonly deleteClinicUseCase: DeleteClinicUseCase,
  ) {}

  @Post('organizations')
  async createOrganization(
    @Body() createHospitalWithClinicDTO: CreateHospitalWithClinicDTO,
  ): Promise<ResponseOrganizationDTO> {
    const organization = await this.createOrganizationUseCase.execute(
      createHospitalWithClinicDTO,
    );

    return plainToInstance(ResponseOrganizationDTO, organization, {
      excludeExtraneousValues: true,
    });
  }

  @Post('hospitals')
  async createHospital(
    @Body() createHospitalDTO: CreateHospitalDTO,
  ): Promise<ResponseHospitalDTO> {
    const hospital =
      await this.createHospitalUseCase.execute(createHospitalDTO);

    return plainToInstance(ResponseHospitalDTO, hospital, {
      excludeExtraneousValues: true,
    });
  }

  @Get('hospitals/:id')
  async searchHospital(@Param('id') id: string): Promise<ResponseHospitalDTO> {
    const hospital = await this.searchHospitalUseCase.execute(id);

    return plainToInstance(ResponseHospitalDTO, hospital, {
      excludeExtraneousValues: true,
    });
  }

  @Patch('hospitals/:id')
  async updateHospital(
    @Param('id') id: string,
    @Body() updateHospitalDTO: UpdateHospitalDTO,
  ): Promise<ResponseHospitalDTO> {
    const hospital = await this.updateHospitalUseCase.execute(
      id,
      updateHospitalDTO,
    );

    return plainToInstance(ResponseHospitalDTO, hospital, {
      excludeExtraneousValues: true,
    });
  }

  @Delete('hospitals/:id')
  async deleteHospital(@Param('id') id: string): Promise<void> {
    return this.deleteHospitalUseCase.execute(id);
  }

  @Post('clinics')
  async createClinic(
    @Body() createClinicDTO: CreateClinicDTO,
  ): Promise<ResponseClinicDTO> {
    const clinic = await this.createClinicUseCase.execute(createClinicDTO);

    return plainToInstance(ResponseClinicDTO, clinic, {
      excludeExtraneousValues: true,
    });
  }

  @Get('clinics/:id')
  async searchClinic(@Param('id') id: string): Promise<ResponseClinicDTO> {
    const clinic = await this.searchClinicUseCase.execute(id);

    return plainToInstance(ResponseClinicDTO, clinic, {
      excludeExtraneousValues: true,
    });
  }

  @Patch('clinics/:id')
  async updateClinic(
    @Param('id') id: string,
    @Body() updateClinicDTO: UpdateClinicDTO,
  ): Promise<ResponseClinicDTO> {
    const clinic = await this.updateClinicUseCase.execute(id, updateClinicDTO);

    return plainToInstance(ResponseClinicDTO, clinic, {
      excludeExtraneousValues: true,
    });
  }

  @Delete('clinics/:id')
  async deleteClinic(@Param('id') id: string): Promise<void> {
    return this.deleteClinicUseCase.execute(id);
  }
}
