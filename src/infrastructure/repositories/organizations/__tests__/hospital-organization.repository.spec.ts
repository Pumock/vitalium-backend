import { Test, TestingModule } from '@nestjs/testing';
import { HospitalRepository } from '../hospital.repository';
import {
  CreateHospitalDTO,
  CreateHospitalWithClinicDTO,
} from '../../../../presentation/dto/organizationDTO/create-organization.dto';
import { PrismaProvider } from '../../../database/prisma.provider';

describe('HospitalRepository - Organization with Hospital and Clinic', () => {
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
    zipCode: '01234-567',
    phone: '+5511999999999',
    email: 'contato@hospitalcentral.com',
    cnpj: '12.345.678/0001-90',
    isActive: true,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
    clinics: [
      {
        id: 'clinic-123',
        name: 'Clínica Cardiológica',
        address: 'Rua das Flores, 125',
        city: 'São Paulo',
        state: 'SP',
        zipCode: '01234-567',
        phone: '+5511888888888',
        email: 'cardio@hospitalcentral.com',
        cnpj: '12.345.678/0002-71',
        hospitalId: 'hospital-123',
        isActive: true,
        createdAt: new Date('2024-01-01'),
        updatedAt: new Date('2024-01-01'),
      },
    ],
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

  describe('createWithClinic', () => {
    it('should create hospital with linked clinics successfully', async () => {
      // Arrange
      const createHospitalWithClinicDto: CreateHospitalWithClinicDTO = {
        hospital: {
          name: 'Hospital Central',
          address: 'Rua das Flores, 123',
          city: 'São Paulo',
          state: 'SP',
          zipCode: '01234-567',
          phone: '+5511999999999',
          email: 'contato@hospitalcentral.com',
          cnpj: '12.345.678/0001-90',
        },
        clinics: [
          {
            name: 'Clínica Cardiológica',
            address: 'Rua das Flores, 125',
            city: 'São Paulo',
            state: 'SP',
            zipCode: '01234-567',
            phone: '+5511888888888',
            email: 'cardio@hospitalcentral.com',
            cnpj: '12.345.678/0002-71',
          },
        ],
      };

      // Mock da transação
      const mockTransaction = jest.fn();
      mockTransaction.mockImplementation(async (callback) => {
        const tx = {
          hospital: {
            create: jest.fn().mockResolvedValue({
              id: 'hospital-123',
              ...createHospitalWithClinicDto.hospital,
            }),
            findUnique: jest.fn().mockResolvedValue(mockHospital),
          },
          clinic: {
            createMany: jest.fn().mockResolvedValue({ count: 1 }),
          },
        };
        return await callback(tx);
      });

      mockPrismaProvider.$transaction.mockImplementation(mockTransaction);

      // Act
      const result = await repository.createWithClinic(
        createHospitalWithClinicDto,
      );

      // Assert
      expect(mockPrismaProvider.$transaction).toHaveBeenCalled();
      expect(result).toBeDefined();
      expect(result.name).toBe(createHospitalWithClinicDto.hospital.name);
      expect(result.clinics).toHaveLength(1);
      expect(result.clinics[0].name).toBe(
        createHospitalWithClinicDto.clinics[0].name,
      );
    });

    it('should handle transaction rollback on error', async () => {
      // Arrange
      const createHospitalWithClinicDto: CreateHospitalWithClinicDTO = {
        hospital: {
          name: 'Hospital Central',
          address: 'Rua das Flores, 123',
          city: 'São Paulo',
          state: 'SP',
          zipCode: '01234-567',
          phone: '+5511999999999',
          email: 'contato@hospitalcentral.com',
          cnpj: '12.345.678/0001-90',
        },
        clinics: [
          {
            name: 'Clínica Cardiológica',
            address: 'Rua das Flores, 125',
            city: 'São Paulo',
            state: 'SP',
            zipCode: '01234-567',
            phone: '+5511888888888',
            email: 'cardio@hospitalcentral.com',
            cnpj: '12.345.678/0002-71',
          },
        ],
      };

      mockPrismaProvider.$transaction.mockRejectedValue(
        new Error('Transaction failed'),
      );

      // Act & Assert
      await expect(
        repository.createWithClinic(createHospitalWithClinicDto),
      ).rejects.toThrow('Transaction failed');
    });
  });

  describe('create - Individual Hospital', () => {
    it('should create individual hospital without clinics', async () => {
      // Arrange
      const createHospitalDto: CreateHospitalDTO = {
        name: 'Hospital Independente',
        address: 'Rua das Palmeiras, 456',
        city: 'Rio de Janeiro',
        state: 'RJ',
        zipCode: '20000-000',
        phone: '+5521999999999',
        email: 'contato@hospitalindependente.com',
        cnpj: '98.765.432/0001-10',
      };

      const mockHospitalWithoutClinics = {
        ...mockHospital,
        ...createHospitalDto,
        clinics: [],
      };

      mockPrismaProvider.hospital.create.mockResolvedValue(
        mockHospitalWithoutClinics,
      );

      // Act
      const result = await repository.create(createHospitalDto);

      // Assert
      expect(mockPrismaProvider.hospital.create).toHaveBeenCalledWith({
        data: {
          ...createHospitalDto,
          isActive: true,
        },
        include: {
          clinics: {
            where: { isActive: true },
            orderBy: { name: 'asc' },
          },
        },
      });
      expect(result).toBeDefined();
      expect(result.name).toBe(createHospitalDto.name);
      expect(result.clinics).toHaveLength(0);
    });
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
