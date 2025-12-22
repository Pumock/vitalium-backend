import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { IHospitalRepository } from '../../../domain/interfaces/repositories/organizations/hospital.repository.interface';
import { PrismaProvider } from '../../database/prisma.provider';
import {
  CreateHospitalDTO,
  CreateHospitalWithClinicDTO,
} from '../../../presentation/dto/organizationDTO/create-organization.dto';
import { Hospital } from '../../database/models/unit/unit.models';
import { UpdateHospitalDTO } from '../../../presentation/dto/organizationDTO/update-organization.dto';

@Injectable()
export class HospitalRepository implements IHospitalRepository {
  constructor(private readonly prisma: PrismaProvider) { }
  /**
   * Criar hospital com clínicas vinculadas usando transação
   */
  async createWithClinic(
    createHospitalWithClinicDTO: CreateHospitalWithClinicDTO,
  ): Promise<Hospital> {
    const result = await this.prisma.$transaction(async (tx) => {
      // Criar o hospital primeiro
      const hospital = await this.prisma.hospital.create({
        data: {
          name: createHospitalWithClinicDTO.hospital.name,
          address: createHospitalWithClinicDTO.hospital.address,
          city: createHospitalWithClinicDTO.hospital.city,
          state: createHospitalWithClinicDTO.hospital.state,
          zipCode: createHospitalWithClinicDTO.hospital.zipCode,
          phone: createHospitalWithClinicDTO.hospital.phone,
          email: createHospitalWithClinicDTO.hospital.email,
          cnpj: createHospitalWithClinicDTO.hospital.cnpj,
          isActive: true,
        },
      });

      // Criar as clínicas vinculadas ao hospital
      await tx.clinic.createMany({
        data: createHospitalWithClinicDTO.clinics.map((clinic) => ({
          name: clinic.name,
          address: clinic.address,
          city: clinic.city,
          state: clinic.state,
          zipCode: clinic.zipCode,
          phone: clinic.phone,
          email: clinic.email,
          cnpj: clinic.cnpj,
          hospitalId: hospital.id, // Vincula ao hospital criado
          isActive: true,
        })),
      });

      // Retornar hospital com clínicas incluídas
      return await tx.hospital.findUnique({
        where: { id: hospital.id },
        include: {
          clinics: {
            where: { isActive: true },
            orderBy: { name: 'asc' },
          },
        },
      });
    });

    return plainToInstance(Hospital, result);
  }

  /**
   * Criar hospital individual (sem clínicas)
   */
  async create(createHospitalDTO: CreateHospitalDTO): Promise<Hospital> {
    const result = await this.prisma.hospital.create({
      data: {
        name: createHospitalDTO.name,
        address: createHospitalDTO.address,
        city: createHospitalDTO.city,
        state: createHospitalDTO.state,
        zipCode: createHospitalDTO.zipCode,
        phone: createHospitalDTO.phone,
        email: createHospitalDTO.email,
        cnpj: createHospitalDTO.cnpj,
        isActive: true,
      },
      include: {
        clinics: {
          where: { isActive: true },
          orderBy: { name: 'asc' },
        },
      },
    });

    return plainToInstance(Hospital, result);
  }

  /**
   * Buscar hospital por ID com clínicas vinculadas
   */
  async findById(id: string): Promise<Hospital | null> {
    const result = await this.prisma.hospital.findUnique({
      where: {
        id,
        isActive: true, // Só retorna se estiver ativo
      },
      include: {
        clinics: {
          where: { isActive: true },
          orderBy: { name: 'asc' },
        },
        doctors: {
          where: { isActive: true },
          include: {
            user: {
              select: {
                firstName: true,
                lastName: true,
                email: true,
              },
            },
          },
          orderBy: { user: { firstName: 'asc' } },
        },
        nurses: {
          where: { isActive: true },
          include: {
            user: {
              select: {
                firstName: true,
                lastName: true,
                email: true,
              },
            },
          },
          orderBy: { user: { firstName: 'asc' } },
        },
      },
    });

    return result ? plainToInstance(Hospital, result) : null;
  }

  /**
   * Atualizar hospital por ID
   */
  async update(
    id: string,
    updateHospitalDTO: UpdateHospitalDTO,
  ): Promise<Hospital> {
    const result = await this.prisma.hospital.update({
      where: { id },
      data: {
        ...(updateHospitalDTO.name && { name: updateHospitalDTO.name }),
        ...(updateHospitalDTO.address && {
          address: updateHospitalDTO.address,
        }),
        ...(updateHospitalDTO.city && { city: updateHospitalDTO.city }),
        ...(updateHospitalDTO.state && { state: updateHospitalDTO.state }),
        ...(updateHospitalDTO.zipCode && {
          zipCode: updateHospitalDTO.zipCode,
        }),
        ...(updateHospitalDTO.phone && { phone: updateHospitalDTO.phone }),
        ...(updateHospitalDTO.email && { email: updateHospitalDTO.email }),
        ...(updateHospitalDTO.cnpj && { cnpj: updateHospitalDTO.cnpj }),
        updatedAt: new Date(),
      },
      include: {
        clinics: {
          where: { isActive: true },
          orderBy: { name: 'asc' },
        },
      },
    });

    return plainToInstance(Hospital, result);
  }

  /**
   * Deletar hospital (soft delete)
   */
  async delete(id: string): Promise<void> {
    // Verificar se o hospital existe e está ativo
    const existingHospital = await this.prisma.hospital.findUnique({
      where: { id, isActive: true },
      include: {
        clinics: {
          where: { isActive: true },
        },
      },
    });

    // Usar transação para desativar hospital e suas clínicas
    await this.prisma.$transaction(async (tx) => {
      // Desativar todas as clínicas do hospital
      if (existingHospital.clinics.length > 0) {
        await tx.clinic.updateMany({
          where: {
            hospitalId: id,
            isActive: true,
          },
          data: {
            isActive: false,
            updatedAt: new Date(),
          },
        });
      }

      // Desativar o hospital (soft delete)
      await tx.hospital.update({
        where: { id },
        data: {
          isActive: false,
          updatedAt: new Date(),
        },
      });
    });
  }

  /**
   * Listar todos os hospitais ativos
   */
  async findAll(): Promise<Hospital[]> {
    const results = await this.prisma.hospital.findMany({
      where: { isActive: true },
      include: {
        clinics: {
          where: { isActive: true },
          orderBy: { name: 'asc' },
        },
      },
      orderBy: { name: 'asc' },
    });

    // return plainToInstance(Hospital, results);
    return [];
  }
}
