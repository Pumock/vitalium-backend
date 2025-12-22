import { Injectable } from '@nestjs/common';
import { PrismaProvider } from '../../database/prisma.provider';
import { plainToInstance } from 'class-transformer';
import { IUnitRepository } from '../../../domain/interfaces/repositories/organizations/unit.repository.interface';
import { CreateUnitDTO } from '../../../presentation/dto/organizationDTO/create-organization.dto';
import { Unit } from '../../database/models/unit.models';
import { UpdateUnitDTO } from '../../../presentation/dto/organizationDTO/update-organization.dto';

@Injectable()
export class UnitRepository implements IUnitRepository {
  constructor(private readonly prisma: PrismaProvider) { }

  async create(createUnitDTO: CreateUnitDTO): Promise<Unit> {
    const result = await this.prisma.unit.create({
      data: createUnitDTO,

    });
    return plainToInstance(Unit, result);
  }

  async findById(id: string): Promise<Unit | null> {
    const result = await this.prisma.unit.findUnique({
      where: { id },

    });

    if (!result) return null;

    return plainToInstance(Unit, result);
  }

  async update(id: string, updateUnitDTO: UpdateUnitDTO): Promise<Unit> {
    const result = await this.prisma.unit.update({
      where: { id },
      data: updateUnitDTO,

    });

    return plainToInstance(Unit, result);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.unit.delete({
      where: { id },
    });
  }

  async deleteMany(where: any) {
    return this.prisma.unit.deleteMany({
      where,
    });
  }
}
