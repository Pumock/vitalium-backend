import { Injectable } from '@nestjs/common';
import { PrismaProvider } from '../../database/prisma.provider';
import { IClinicRepository } from '../../../domain/interfaces/repositories/organizations/clinic.repository.interface';
import { Clinic } from '../../database/models/clinic.models';
import { CreateClinicDTO } from '../../../presentation/dto/organizationDTO/create-organization.dto';
import { UpdateClinicDTO } from '../../../presentation/dto/organizationDTO/update-organization.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class ClinicRepository implements IClinicRepository {
  constructor(private readonly prisma: PrismaProvider) {}

  async create(createClinicDTO: CreateClinicDTO): Promise<Clinic> {
    const result = await this.prisma.clinic.create({
      data: createClinicDTO,
      include: {
        hospital: true,
      },
    });
    return plainToInstance(Clinic, result);
  }

  async findById(id: string): Promise<Clinic | null> {
    const result = await this.prisma.clinic.findUnique({
      where: { id },
      include: {
        hospital: true,
      },
    });

    if (!result) return null;

    return plainToInstance(Clinic, result);
  }

  async update(id: string, updateClinicDTO: UpdateClinicDTO): Promise<Clinic> {
    const result = await this.prisma.clinic.update({
      where: { id },
      data: updateClinicDTO,
      include: {
        hospital: true,
      },
    });

    return plainToInstance(Clinic, result);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.clinic.delete({
      where: { id },
    });
  }

  async deleteMany(where: any) {
    return this.prisma.clinic.deleteMany({
      where,
    });
  }
}
