import { Module } from '@nestjs/common';
import { PrismaModule } from '../infrastructure/database/prisma.module';

// Controllers
import { OrganizationController } from '../presentation/controllers/organization/organization.controller';

// Use Cases - Organization
import { CreateOrganizationUseCase } from '../application/use-cases/organization/create-organization.use-case';

// Use Cases - Clinic
import { CreateClinicUseCase } from '../application/use-cases/organization/create-clinic.use-case';
import { SearchClinicUseCase } from '../application/use-cases/organization/search-clinic.use-case';
import { UpdateClinicUseCase } from '../application/use-cases/organization/update-clinic.use-case';
import { DeleteClinicUseCase } from '../application/use-cases/organization/delete-clinic.use-case';

// Use Cases - Hospital
import { CreateHospitalUseCase } from '../application/use-cases/organization/create-hospital.use-case';
import { SearchHospitalUseCase } from '../application/use-cases/organization/search-hospital.use-case';
import { UpdateHospitalUseCase } from '../application/use-cases/organization/update-hospital.use-case';
import { DeleteHospitalUseCase } from '../application/use-cases/organization/delete-hospital.use-case';

// Repositories
import { HospitalRepository } from '../infrastructure/repositories/organizations/hospital.repository';
import { ClinicRepository } from '../infrastructure/repositories/organizations/clinic.repository';

@Module({
  imports: [PrismaModule],
  controllers: [OrganizationController],
  providers: [
    // Use Cases - Organization
    CreateOrganizationUseCase,

    // Use Cases - Clinic
    CreateClinicUseCase,
    SearchClinicUseCase,
    UpdateClinicUseCase,
    DeleteClinicUseCase,

    // Use Cases - Hospital
    CreateHospitalUseCase,
    SearchHospitalUseCase,
    UpdateHospitalUseCase,
    DeleteHospitalUseCase,

    // Repositories
    {
      provide: 'IHospitalRepository',
      useClass: HospitalRepository,
    },
    {
      provide: 'IClinicRepository',
      useClass: ClinicRepository,
    },
  ],
  exports: [
    CreateOrganizationUseCase,
    CreateClinicUseCase,
    SearchClinicUseCase,
    UpdateClinicUseCase,
    DeleteClinicUseCase,
    CreateHospitalUseCase,
    SearchHospitalUseCase,
    UpdateHospitalUseCase,
    DeleteHospitalUseCase,
  ],
})
export class OrganizationModule {}
