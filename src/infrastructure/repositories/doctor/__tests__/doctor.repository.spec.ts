import { Test, TestingModule } from '@nestjs/testing';
import { DoctorRepository } from '../doctor.repository';
import { PrismaProvider } from '../../../database/prisma.provider';
import { CreateDoctorDTO } from '../../../../presentation/dto/doctorDTO/create-doctor.dto';
import { UpdateDoctorDTO } from '../../../../presentation/dto/doctorDTO/update-doctor.dto';
import { Role } from '../../../../shared/enums/role.enum';

describe('DoctorRepository', () => {
  let repository: DoctorRepository;

  const mockPrismaProvider = {
    doctor: {
      create: jest.fn(),
      findUnique: jest.fn(),
      findMany: jest.fn(),
      update: jest.fn(),
    },
  };

  const mockDoctor = {
    id: 'doctor-123',
    userId: 'user-123',
    crm: 'CRM123456',
    crmState: true,
    consultationPrice: 150.0,
    hospitalId: 'hospital-123',
    clinicId: 'clinic-123',
    isActive: true,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
    user: {
      id: 'user-123',
      firstName: 'Dr. João',
      lastName: 'Silva',
      email: 'joao.silva@hospital.com',
      phone: '+5511999999999',
      avatar: 'https://example.com/avatar.jpg',
      role: Role.DOCTOR,
      isActive: true,
      createdAt: new Date('2024-01-01'),
      updatedAt: new Date('2024-01-01'),
    },
    hospital: {
      id: 'hospital-123',
      name: 'Hospital Central',
      city: 'São Paulo',
      state: 'SP',
    },
    clinic: {
      id: 'clinic-123',
      name: 'Clínica Cardiológica',
      city: 'São Paulo',
      state: 'SP',
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DoctorRepository,
        {
          provide: PrismaProvider,
          useValue: mockPrismaProvider,
        },
      ],
    }).compile();

    repository = module.get<DoctorRepository>(DoctorRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should create a doctor successfully', async () => {
      // Arrange
      const createDoctorDto: CreateDoctorDTO = {
        crm: 'CRM123456',
        crmState: true,
        consultationPrice: 150.0,
        isActive: true,
        userId: 'user-123',
        user: { id: 'user-123' } as any,
        hospital: { id: 'hospital-123' } as any,
        clinic: { id: 'clinic-123' } as any,
      };

      mockPrismaProvider.doctor.create.mockResolvedValue(mockDoctor);

      // Act
      const result = await repository.create(createDoctorDto);

      // Assert
      expect(mockPrismaProvider.doctor.create).toHaveBeenCalledWith({
        data: {
          userId: createDoctorDto.user?.id || '',
          crm: createDoctorDto.crm,
          crmState: createDoctorDto.crmState,
          consultationPrice: createDoctorDto.consultationPrice || null,
          hospitalId: createDoctorDto.hospital?.id,
          clinicId: createDoctorDto.clinic?.id,
          isActive: createDoctorDto.isActive,
        },
        include: expect.objectContaining({
          user: expect.any(Object),
          hospital: expect.any(Object),
          clinic: expect.any(Object),
        }),
      });
      expect(result).toBeDefined();
      expect(result.crm).toBe(createDoctorDto.crm);
    });
  });

  describe('findById', () => {
    it('should find a doctor by id', async () => {
      // Arrange
      const doctorId = 'doctor-123';
      mockPrismaProvider.doctor.findUnique.mockResolvedValue(mockDoctor);

      // Act
      const result = await repository.findById(doctorId);

      // Assert
      expect(mockPrismaProvider.doctor.findUnique).toHaveBeenCalledWith({
        where: {
          id: doctorId,
          isActive: true,
        },
        include: expect.objectContaining({
          user: expect.any(Object),
          hospital: expect.any(Object),
          clinic: expect.any(Object),
        }),
      });
      expect(result).toBeDefined();
      expect(result.id).toBe(doctorId);
    });

    it('should return null if doctor not found', async () => {
      // Arrange
      const doctorId = 'non-existent-id';
      mockPrismaProvider.doctor.findUnique.mockResolvedValue(null);

      // Act
      const result = await repository.findById(doctorId);

      // Assert
      expect(result).toBeNull();
    });
  });

  describe('findAll', () => {
    it('should return all active doctors', async () => {
      // Arrange
      const mockDoctors = [mockDoctor];
      mockPrismaProvider.doctor.findMany.mockResolvedValue(mockDoctors);

      // Act
      const result = await repository.findAll();

      // Assert
      expect(mockPrismaProvider.doctor.findMany).toHaveBeenCalledWith({
        where: { isActive: true },
        include: expect.objectContaining({
          user: expect.any(Object),
          hospital: expect.any(Object),
          clinic: expect.any(Object),
        }),
        orderBy: { user: { firstName: 'asc' } },
      });
      expect(result).toHaveLength(1);
      expect(result[0].id).toBe(mockDoctor.id);
    });

    it('should return empty array if no doctors found', async () => {
      // Arrange
      mockPrismaProvider.doctor.findMany.mockResolvedValue([]);

      // Act
      const result = await repository.findAll();

      // Assert
      expect(result).toEqual([]);
    });
  });

  describe('update', () => {
    it('should update a doctor successfully', async () => {
      // Arrange
      const doctorId = 'doctor-123';
      const updateDoctorDto: UpdateDoctorDTO = {
        crm: 'CRM654321',
        crmState: false,
        consultationPrice: 200.0,
        hospital: { id: 'hospital-456' } as any,
      };

      const updatedDoctor = {
        ...mockDoctor,
        crm: 'CRM654321',
        crmState: false,
        consultationPrice: 200.0,
      };

      // Mock para verificação de existência
      mockPrismaProvider.doctor.findUnique.mockResolvedValue(mockDoctor);
      mockPrismaProvider.doctor.update.mockResolvedValue(updatedDoctor);

      // Act
      const result = await repository.update(doctorId, updateDoctorDto);

      // Assert
      expect(mockPrismaProvider.doctor.update).toHaveBeenCalledWith({
        where: { id: doctorId },
        data: {
          crm: updateDoctorDto.crm,
          crmState: updateDoctorDto.crmState,
          consultationPrice: updateDoctorDto.consultationPrice,
          updatedAt: expect.any(Date),
        },
        include: expect.objectContaining({
          user: expect.any(Object),
          hospital: expect.any(Object),
          clinic: expect.any(Object),
        }),
      });
      expect(result.crm).toBe(updateDoctorDto.crm);
    });

    it('should throw error when doctor not found for update', async () => {
      // Arrange
      const doctorId = 'non-existent-id';
      const updateDoctorDto: UpdateDoctorDTO = {
        crm: 'CRM654321',
      };

      mockPrismaProvider.doctor.findUnique.mockResolvedValue(null);

      // Act & Assert
      await expect(
        repository.update(doctorId, updateDoctorDto),
      ).rejects.toThrow(`Doctor with id ${doctorId} not found`);
    });
  });

  describe('delete', () => {
    it('should soft delete a doctor', async () => {
      // Arrange
      const doctorId = 'doctor-123';
      // Mock para verificação de existência
      mockPrismaProvider.doctor.findUnique.mockResolvedValue(mockDoctor);
      mockPrismaProvider.doctor.update.mockResolvedValue(undefined);

      // Act
      await repository.delete(doctorId);

      // Assert
      expect(mockPrismaProvider.doctor.update).toHaveBeenCalledWith({
        where: { id: doctorId },
        data: {
          isActive: false,
          updatedAt: expect.any(Date),
        },
      });
    });

    it('should throw error when doctor not found for delete', async () => {
      // Arrange
      const doctorId = 'non-existent-id';
      mockPrismaProvider.doctor.findUnique.mockResolvedValue(null);

      // Act & Assert
      await expect(repository.delete(doctorId)).rejects.toThrow(
        `Doctor with id ${doctorId} not found`,
      );
    });
  });
});
