import { Module } from "@nestjs/common";
import { PrismaModule } from "../infrastructure/database/prisma.module";
import { OrganizationController } from "../presentation/controllers/organization/organization.controller";
import { CreateUnitUseCase } from "../application/use-cases/organization/create-unit.use-case";
import { UnitRepository } from "../infrastructure/repositories/organizations/unit.repository";

@Module({
  imports: [PrismaModule],
  controllers: [OrganizationController],
  providers: [
    CreateUnitUseCase,
    {
      provide: 'IUnitRepository',
      useClass: UnitRepository,
    },
  ],
  exports: [
    CreateUnitUseCase,
  ],
})
export class OrganizationModule { }
