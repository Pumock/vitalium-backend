import { Test, TestingModule } from '@nestjs/testing';
import { CreateHospitalUseCase } from '../create-hospital.use-case';
import { IHospitalRepository } from '../../../../domain/interfaces/repositories/organizations/hospital.repository.interface';
import { CreateHospitalDTO } from '../../../../presentation/dto/unitDTO/create-unit.dto';
import { ValidationException } from '../../../../shared/execeptions/system/validation.exception';
import { DatabaseException } from '../../../../shared/execeptions/system/database.exception';

describe('CreateHospitalUseCase', () => {
  let useCase: CreateHospitalUseCase;
  let hospitalRepository: jest.Mocked<IHospitalRepository>;

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
  };

  beforeEach(async () => {
    const mockHospitalRepository = {
      create: jest.fn(),
      findById: jest.fn(),
      findAll: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateHospitalUseCase,
        {
          provide: 'IHospitalRepository',
          useValue: mockHospitalRepository,
        },
      ],
    }).compile();

    useCase = module.get<CreateHospitalUseCase>(CreateHospitalUseCase);
    hospitalRepository = module.get('IHospitalRepository');
  });

  describe('execute', () => {
    it('should create hospital successfully with valid data', async () => {
      // Arrange
      const createHospitalDto: CreateHospitalDTO = {
        name: 'Hospital Central',
        address: 'Rua das Flores, 123',
        city: 'São Paulo',
        state: 'SP',
        zipCode: '01234-567',
        phone: '+5511999999999',
        email: 'contato@hospitalcentral.com',
        cnpj: '12.345.678/0001-90',
      };

      hospitalRepository.create.mockResolvedValue(mockHospital as any);

      // Act
      const result = await useCase.execute(createHospitalDto);

      // Assert
      expect(hospitalRepository.create).toHaveBeenCalledWith(createHospitalDto);
      expect(result).toEqual(mockHospital);
      expect(result.name).toBe(createHospitalDto.name);
    });

    it('should throw ValidationException when name is missing', async () => {
      // Arrange
      const createHospitalDto: CreateHospitalDTO = {
        name: '',
        address: 'Rua das Flores, 123',
        city: 'São Paulo',
        state: 'SP',
        zipCode: '01234-567',
        phone: '+5511999999999',
        email: 'contato@hospitalcentral.com',
        cnpj: '12.345.678/0001-90',
      };

      // Act & Assert
      await expect(useCase.execute(createHospitalDto)).rejects.toThrow(
        ValidationException,
      );
      expect(hospitalRepository.create).not.toHaveBeenCalled();
    });

    it('should throw ValidationException when name is null', async () => {
      // Arrange
      const createHospitalDto: CreateHospitalDTO = {
        name: null as any,
        address: 'Rua das Flores, 123',
        city: 'São Paulo',
        state: 'SP',
        zipCode: '01234-567',
        phone: '+5511999999999',
        email: 'contato@hospitalcentral.com',
        cnpj: '12.345.678/0001-90',
      };

      // Act & Assert
      await expect(useCase.execute(createHospitalDto)).rejects.toThrow(
        ValidationException,
      );
      expect(hospitalRepository.create).not.toHaveBeenCalled();
    });

    it('should throw DatabaseException when repository fails', async () => {
      // Arrange
      const createHospitalDto: CreateHospitalDTO = {
        name: 'Hospital Central',
        address: 'Rua das Flores, 123',
        city: 'São Paulo',
        state: 'SP',
        zipCode: '01234-567',
        phone: '+5511999999999',
        email: 'contato@hospitalcentral.com',
        cnpj: '12.345.678/0001-90',
      };

      hospitalRepository.create.mockRejectedValue(
        new Error('Database connection failed'),
      );

      // Act & Assert
      await expect(useCase.execute(createHospitalDto)).rejects.toThrow(
        DatabaseException,
      );
      expect(hospitalRepository.create).toHaveBeenCalledWith(createHospitalDto);
    });

    it('should create hospital with minimal required data', async () => {
      // Arrange
      const createHospitalDto: CreateHospitalDTO = {
        name: 'Hospital Mínimo',
        address: 'Endereço básico',
        city: 'Cidade',
        state: 'Estado',
        zipCode: '00000-000',
        phone: '11999999999',
        email: 'email@hospital.com',
        cnpj: '00.000.000/0001-00',
      };

      const minimalHospital = {
        ...mockHospital,
        name: 'Hospital Mínimo',
      };

      hospitalRepository.create.mockResolvedValue(minimalHospital as any);

      // Act
      const result = await useCase.execute(createHospitalDto);

      // Assert
      expect(result).toBeDefined();
      expect(result.name).toBe('Hospital Mínimo');
    });
  });
});
