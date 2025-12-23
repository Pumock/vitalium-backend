import { Module } from "@nestjs/common";
import { CreateDoctorUnitUseCase } from "../application/use-cases/doctor-unit/create-doctor-unit.use-case";
import { PrismaModule } from "../infrastructure/database/prisma.module";
import { DoctorUnitRepository } from "../infrastructure/repositories/doctor-unit/doctor-unit.repository";
import { DoctorRepository } from "../infrastructure/repositories/doctor/doctor.repository";
import { UnitRepository } from "../infrastructure/repositories/units/unit.repository";
import { DoctorUnitController } from "../presentation/controllers/doctor-unit/doctor-unit.controller";

@Module({
    imports: [PrismaModule],
    controllers: [DoctorUnitController],
    providers: [
        CreateDoctorUnitUseCase,

        {
            provide: 'IDoctorRepository',
            useClass: DoctorRepository,
        },
        {
            provide: 'IDoctorUnitRepository',
            useClass: DoctorUnitRepository,
        },
        {
            provide: 'IUnitRepository',
            useClass: UnitRepository,
        },
    ],
})
export class DoctorUnitModule { }
