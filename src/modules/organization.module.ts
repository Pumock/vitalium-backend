import { Module } from "@nestjs/common";
import { PrismaModule } from "../infrastructure/database/prisma.module";
import { CreateUnitUseCase } from "../application/use-cases/organization/create-unit.use-case";
import { UnitRepository } from "../infrastructure/repositories/organizations/unit.repository";
import { UnitController } from "../presentation/controllers/organization/unit.controller";

@Module({
  imports: [PrismaModule],
  controllers: [UnitController],
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
