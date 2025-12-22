import { Test, TestingModule } from '@nestjs/testing';
import { HospitalRepository } from '../hospital.repository';

import { PrismaProvider } from '../../database/prisma.provider';

describe('Create Unit', () => {
  let repository: HospitalRepository;

  const mockPrismaProvider = {
    $transaction: jest.fn(),
    hospital: {
      create: jest.fn(),
      findUnique: jest.fn(),
      findMany: jest.fn(),
      update: jest.fn(),
    },
    clinic: {
      createMany: jest.fn(),
      updateMany: jest.fn(),
    },
  };

  const mockHospital = {
    id: 'hospital-123',
    name: 'Hospital Central',
    address: 'Rua das Flores, 123',
    city: 'São Paulo',
    state: 'SP',
    tyoe: 'HOSPITAL',
    zipCode: '01234-567',
    phone: '+5511999999999',
    email: 'contato@hospitalcentral.com',
    cnpj: '12.345.678/0001-90',
    isActive: true,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),

  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        HospitalRepository,
        {
          provide: PrismaProvider,
          useValue: mockPrismaProvider,
        },
      ],
    }).compile();

    repository = module.get<HospitalRepository>(HospitalRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });


  describe('delete - Cascade Delete', () => {
    it('should soft delete hospital and its associated clinics', async () => {
      // Arrange
      const hospitalId = 'hospital-123';

      // Mock da transação para soft delete
      const mockTransaction = jest.fn();
      mockTransaction.mockImplementation(async (callback) => {
        const tx = {
          clinic: {
            updateMany: jest.fn().mockResolvedValue({ count: 1 }),
          },
          hospital: {
            update: jest.fn().mockResolvedValue(undefined),
          },
        };
        return await callback(tx);
      });

      mockPrismaProvider.$transaction.mockImplementation(mockTransaction);
      mockPrismaProvider.hospital.findUnique.mockResolvedValue(mockHospital);

      // Act
      await repository.delete(hospitalId);

      // Assert
      expect(mockPrismaProvider.hospital.findUnique).toHaveBeenCalledWith({
        where: { id: hospitalId, isActive: true },
        include: {
          clinics: {
            where: { isActive: true },
          },
        },
      });
      expect(mockPrismaProvider.$transaction).toHaveBeenCalled();
    });
  });

  describe('findById - Complex Relationships', () => {
    it('should find hospital with all related entities', async () => {
      // Arrange
      const hospitalId = 'hospital-123';
      const mockHospitalWithRelations = {
        ...mockHospital,
        doctors: [
          {
            id: 'doctor-123',
            crm: 'CRM123456',
            specialty: 'Cardiologia',
            isActive: true,
            user: {
              firstName: 'Dr. João',
              lastName: 'Silva',
              email: 'joao.silva@hospital.com',
            },
          },
        ],
        nurses: [
          {
            id: 'nurse-123',
            coren: 'COREN123456',
            isActive: true,
            user: {
              firstName: 'Enf. Maria',
              lastName: 'Santos',
              email: 'maria.santos@hospital.com',
            },
          },
        ],
      };

      mockPrismaProvider.hospital.findUnique.mockResolvedValue(
        mockHospitalWithRelations,
      );

      // Act
      const result = await repository.findById(hospitalId);

      // Assert
      expect(mockPrismaProvider.hospital.findUnique).toHaveBeenCalledWith({
        where: {
          id: hospitalId,
          isActive: true,
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
      expect(result).toBeDefined();
      expect(result.clinics).toHaveLength(1);
      expect(result.doctors).toHaveLength(1);
      expect(result.nurses).toHaveLength(1);
    });
  });
});
