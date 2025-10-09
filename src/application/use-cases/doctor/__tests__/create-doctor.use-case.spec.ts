import { Test, TestingModule } from '@nestjs/testing';
import { CreateDoctorUseCase } from '../create-doctor.use-case';
import { IDoctorRepository } from '../../../../domain/interfaces/repositories/doctor/doctor.repository.interface';
import { IUserRepository } from '../../../../domain/interfaces/repositories/user/user.repository.interface';
import { CreateDoctorDTO } from '../../../../presentation/dto/doctorDTO/create-doctor.dto';
import { ValidationException } from '../../../../shared/execeptions/system/validation.exception';
import { Role } from '../../../../shared/enums/role.enum';

describe('CreateDoctorUseCase', () => {
  let useCase: CreateDoctorUseCase;
  let doctorRepository: jest.Mocked<IDoctorRepository>;
  let userRepository: jest.Mocked<IUserRepository>;

  const mockUser = {
    id: 'user-123',
    email: 'doctor@example.com',
    password: 'hashedPassword123',
    firstName: 'Dr. João',
    lastName: 'Silva',
    phone: '+5511999999999',
    avatar: 'https://example.com/avatar.jpg',
    isActive: true,
    role: Role.DOCTOR,
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-01-01T00:00:00.000Z',
  };

  const mockDoctor = {
    id: 'doctor-123',
    userId: 'user-123',
    user: mockUser,
    crm: 'CRM123456',
    crmState: 'ACTIVE',
    consultationPrice: 150.0,
    hospitalId: 'hospital-123',
    clinicId: 'clinic-123',
    hospital: {
      id: 'hospital-123',
      name: 'Hospital Central',
    } as any,
    clinic: {
      id: 'clinic-123',
      name: 'Clínica Cardiológica',
    } as any,
    isActive: true,
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-01-01T00:00:00.000Z',
  } as any;

  beforeEach(async () => {
    const mockDoctorRepository = {
      create: jest.fn(),
      findById: jest.fn(),
      findAll: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    };

    const mockUserRepository = {
      create: jest.fn(),
      findById: jest.fn(),
      findByEmail: jest.fn(),
      findAll: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateDoctorUseCase,
        {
          provide: 'IDoctorRepository',
          useValue: mockDoctorRepository,
        },
        {
          provide: 'IUserRepository',
          useValue: mockUserRepository,
        },
      ],
    }).compile();

    useCase = module.get<CreateDoctorUseCase>(CreateDoctorUseCase);
    doctorRepository = module.get('IDoctorRepository');
    userRepository = module.get('IUserRepository');
  });

  describe('execute', () => {
    it('should create doctor successfully with valid data', async () => {
      // Arrange
      const createDoctorDto: CreateDoctorDTO = {
        crm: 'CRM123456',
        crmState: true,
        consultationPrice: 150.0,
        isActive: true,
        userId: 'user-123',
        user: {
          id: 'user-123',
        } as any,
        hospital: {
          id: 'hospital-123',
          name: 'Hospital Test',
        } as any,
        clinic: {
          id: 'clinic-123',
          name: 'Clinic Test',
        } as any,
      };

      userRepository.findById.mockResolvedValue(mockUser as any);
      doctorRepository.create.mockResolvedValue(mockDoctor);

      // Act
      const result = await useCase.execute(createDoctorDto);

      // Assert
      expect(userRepository.findById).toHaveBeenCalledWith(
        createDoctorDto.user?.id,
      );
      expect(userRepository.create).not.toHaveBeenCalled();
      expect(doctorRepository.create).toHaveBeenCalledWith(
        expect.objectContaining({
          user: mockUser,
          crm: createDoctorDto.crm,
          crmState: createDoctorDto.crmState,
          consultationPrice: createDoctorDto.consultationPrice,
          isActive: createDoctorDto.isActive,
          hospital: createDoctorDto.hospital,
          clinic: createDoctorDto.clinic,
        }),
      );
      expect(result).toEqual(mockDoctor);
    });

    it('should throw ValidationException when user does not exist', async () => {
      // Arrange
      const createDoctorDto: CreateDoctorDTO = {
        crm: 'CRM123456',
        crmState: true,
        consultationPrice: 150.0,
        isActive: true,
        userId: 'non-existent-user-id',
        user: {
          id: 'non-existent-user-id',
        } as any,
        hospital: {
          id: 'hospital-123',
          name: 'Hospital Test',
        } as any,
      };

      userRepository.findById.mockResolvedValue(null);

      // Act & Assert
      await expect(useCase.execute(createDoctorDto)).rejects.toThrow(
        ValidationException,
      );
      expect(userRepository.findById).toHaveBeenCalledWith(
        createDoctorDto.user?.id,
      );
      expect(userRepository.create).not.toHaveBeenCalled();
      expect(doctorRepository.create).not.toHaveBeenCalled();
    });

    it('should throw ValidationException with invalid data', async () => {
      // Arrange
      const invalidCreateDoctorDto = {
        crm: '',
        crmState: true,
        isActive: true,
        user: {
          email: '', // Empty email
          password: 'TestPassword123!',
          firstName: '',
          lastName: '',
          isActive: true,
          role: Role.DOCTOR,
        },
      } as CreateDoctorDTO;

      // Act & Assert
      await expect(useCase.execute(invalidCreateDoctorDto)).rejects.toThrow(
        ValidationException,
      );
    });

    it('should create doctor without hospital and clinic', async () => {
      // Arrange
      const createDoctorDto: CreateDoctorDTO = {
        crm: 'CRM789012',
        crmState: true,
        consultationPrice: 120.0,
        isActive: true,
        userId: 'doctor-without-hospital-id',
        user: {
          id: 'doctor-without-hospital-id',
        } as any,
      };

      userRepository.findById.mockResolvedValue(mockUser as any);
      doctorRepository.create.mockResolvedValue(mockDoctor);

      // Act
      const result = await useCase.execute(createDoctorDto);

      // Assert
      expect(result).toEqual(mockDoctor);
    });

    it('should throw ValidationException when user role is not DOCTOR', async () => {
      // Arrange
      const createDoctorDto: CreateDoctorDTO = {
        crm: 'CRM123456',
        crmState: true,
        consultationPrice: 150.0,
        isActive: true,
        userId: 'patient-user-id',
        user: {
          id: 'patient-user-id',
        } as any,
      };

      const mockUserWithWrongRole = {
        ...mockUser,
        role: Role.PATIENT,
      };

      userRepository.findById.mockResolvedValue(mockUserWithWrongRole as any);

      // Act & Assert
      await expect(useCase.execute(createDoctorDto)).rejects.toThrow(
        ValidationException,
      );
    });

    it('should create doctor successfully even with minimal data', async () => {
      // Arrange
      const createDoctorDto: CreateDoctorDTO = {
        crm: 'CRM555666',
        crmState: true,
        isActive: true,
        userId: 'minimal-user-id',
        user: {
          id: 'minimal-user-id',
        } as any,
      };

      userRepository.findById.mockResolvedValue(mockUser as any);
      doctorRepository.create.mockResolvedValue(mockDoctor);

      // Act
      const result = await useCase.execute(createDoctorDto);

      // Assert
      expect(result).toEqual(mockDoctor);
      expect(doctorRepository.create).toHaveBeenCalledWith(
        expect.objectContaining({
          crm: createDoctorDto.crm,
          crmState: createDoctorDto.crmState,
          isActive: createDoctorDto.isActive,
        }),
      );
    });
  });
});
