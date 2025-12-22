import { Module } from "@nestjs/common";
import { PrismaModule } from "../infrastructure/repositories/database/prisma.module";
import { CreateUnitUseCase } from "../application/use-cases/unit/create-unit.use-case";
import { UnitRepository } from "../infrastructure/repositories/units/unit.repository";
import { UnitController } from "../presentation/controllers/unit/unit.controller";

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
export class UnitModule { }
