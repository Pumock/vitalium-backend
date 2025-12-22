import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { IDoctorRepository } from '../../../domain/interfaces/repositories/doctor/doctor.repository.interface';
import { PrismaProvider } from '../../database/prisma.provider';
import { CreateDoctorDTO } from '../../../presentation/dto/doctorDTO/create-doctor.dto';
import { UpdateDoctorDTO } from '../../../presentation/dto/doctorDTO/update-doctor.dto';
import { Doctor } from '../../database/models/doctor.models';

@Injectable()
export class DoctorRepository implements IDoctorRepository {
  constructor(private readonly prisma: PrismaProvider) { }

  /**
   * Criar médico
   */
  async create(createDoctorDTO: CreateDoctorDTO): Promise<Doctor> {
    const result = await this.prisma.doctor.create({
      data: {
        userId: createDoctorDTO.user?.id || '',
        crm: createDoctorDTO.crm,
        crmState: createDoctorDTO.crmState,
        consultationPrice: createDoctorDTO.consultationPrice || null,
        hospitalId: createDoctorDTO.hospital?.id,
        clinicId: createDoctorDTO.clinic?.id,
        isActive: createDoctorDTO.isActive,
      },
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            phone: true,
            avatar: true,
            role: true,
            isActive: true,
            createdAt: true,
            updatedAt: true,
          },
        },
        hospital: {
          select: {
            id: true,
            name: true,
            city: true,
            state: true,
          },
        },
        clinic: {
          select: {
            id: true,
            name: true,
            city: true,
            state: true,
          },
        },
      },
    });

    // Transformar consultationPrice para number se necessário
    const transformedResult = {
      ...result,
      consultationPrice: result.consultationPrice
        ? Number(result.consultationPrice)
        : null,
    };

    return plainToInstance(Doctor, transformedResult);
  }

  /**
   * Buscar médico por ID
   */
  async findById(id: string): Promise<Doctor | null> {
    const result = await this.prisma.doctor.findUnique({
      where: {
        id,
        isActive: true,
      },
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            phone: true,
            avatar: true,
            role: true,
            isActive: true,
            createdAt: true,
            updatedAt: true,
          },
        },
        hospital: {
          select: {
            id: true,
            name: true,
            address: true,
            city: true,
            state: true,
            phone: true,
            email: true,
          },
        },
        clinic: {
          select: {
            id: true,
            name: true,
            address: true,
            city: true,
            state: true,
            phone: true,
            email: true,
          },
        },
      },
    });

    if (!result) return null;

    // Transformar consultationPrice para number se necessário
    const transformedResult = {
      ...result,
      consultationPrice: result.consultationPrice
        ? Number(result.consultationPrice)
        : null,
    };

    return plainToInstance(Doctor, transformedResult);
  }

  /**
   * Listar todos os médicos ativos
   */
  async findAll(): Promise<Doctor[]> {
    const results = await this.prisma.doctor.findMany({
      where: { isActive: true },
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            phone: true,
            avatar: true,
            role: true,
            isActive: true,
            createdAt: true,
            updatedAt: true,
          },
        },
        hospital: {
          select: {
            id: true,
            name: true,
            city: true,
            state: true,
          },
        },
        clinic: {
          select: {
            id: true,
            name: true,
            city: true,
            state: true,
          },
        },
      },
      orderBy: { user: { firstName: 'asc' } },
    });

    // Transformar consultationPrice para number em todos os resultados
    const transformedResults = results.map((result) => ({
      ...result,
      consultationPrice: result.consultationPrice
        ? Number(result.consultationPrice)
        : null,
    }));

    return plainToInstance(Doctor, transformedResults);
  }

  /**
   * Atualizar médico por ID
   */
  async update(id: string, updateDoctorDTO: UpdateDoctorDTO): Promise<Doctor> {
    // Verificar se o médico existe antes de atualizar
    const existingDoctor = await this.prisma.doctor.findUnique({
      where: { id, isActive: true },
    });

    if (!existingDoctor) {
      throw new Error(`Doctor with id ${id} not found`);
    }

    const result = await this.prisma.doctor.update({
      where: { id },
      data: {
        ...(updateDoctorDTO.crm && { crm: updateDoctorDTO.crm }),
        ...(updateDoctorDTO.crmState !== undefined && {
          crmState: updateDoctorDTO.crmState,
        }),
        ...(updateDoctorDTO.consultationPrice && {
          consultationPrice: updateDoctorDTO.consultationPrice,
        }),
        updatedAt: new Date(),
      },
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            phone: true,
            avatar: true,
            role: true,
            isActive: true,
            createdAt: true,
            updatedAt: true,
          },
        },
        hospital: {
          select: {
            id: true,
            name: true,
            city: true,
            state: true,
          },
        },
        clinic: {
          select: {
            id: true,
            name: true,
            city: true,
            state: true,
          },
        },
      },
    });

    // Transformar consultationPrice para number se necessário
    const transformedResult = {
      ...result,
      consultationPrice: result.consultationPrice
        ? Number(result.consultationPrice)
        : null,
    };

    return plainToInstance(Doctor, transformedResult);
  }

  /**
   * Deletar médico (soft delete)
   */
  async delete(id: string): Promise<void> {
    // Verificar se o médico existe antes de deletar
    const existingDoctor = await this.prisma.doctor.findUnique({
      where: { id, isActive: true },
    });

    if (!existingDoctor) {
      throw new Error(`Doctor with id ${id} not found`);
    }

    await this.prisma.doctor.update({
      where: { id },
      data: {
        isActive: false,
        updatedAt: new Date(),
      },
    });
  }
}
