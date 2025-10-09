import { Test, TestingModule } from '@nestjs/testing';
import { CreateClinicUseCase } from '../create-clinic.use-case';
import { IClinicRepository } from '../../../../domain/interfaces/repositories/organizations/clinic.repository.interface';
import { CreateClinicDTO } from '../../../../presentation/dto/organizationDTO/create-organization.dto';
import { ValidationException } from '../../../../shared/execeptions/system/validation.exception';
import { DatabaseException } from '../../../../shared/execeptions/system/database.exception';

describe('CreateClinicUseCase', () => {
  let useCase: CreateClinicUseCase;
  let clinicRepository: jest.Mocked<IClinicRepository>;

  const mockClinic = {
    id: 'clinic-123',
    name: 'Clínica Cardiologia',
    address: 'Ala B, 2º andar',
    city: 'São Paulo',
    state: 'SP',
    zipCode: '01234-567',
    phone: '+55 11 8888-8888',
    email: 'cardio@hospital.com',
    cnpj: '98.765.432/0001-10',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  };

  beforeEach(async () => {
    const mockClinicRepository = {
      create: jest.fn(),
      findById: jest.fn(),
      findByName: jest.fn(),
      findAll: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateClinicUseCase,
        {
          provide: 'IClinicRepository',
          useValue: mockClinicRepository,
        },
      ],
    }).compile();

    useCase = module.get<CreateClinicUseCase>(CreateClinicUseCase);
    clinicRepository = module.get('IClinicRepository');
  });

  describe('execute', () => {
    it('should create clinic successfully', async () => {
      const createClinicDto: CreateClinicDTO = {
        name: 'Clínica Cardiologia',
        address: 'Ala B, 2º andar',
        city: 'São Paulo',
        state: 'SP',
        zipCode: '01234-567',
        phone: '+55 11 8888-8888',
        email: 'cardio@hospital.com',
        cnpj: '98.765.432/0001-10',
      };

      clinicRepository.create.mockResolvedValue(mockClinic as any);

      const result = await useCase.execute(createClinicDto);

      expect(clinicRepository.create).toHaveBeenCalledWith(createClinicDto);
      expect(result).toEqual(mockClinic);
      expect(result.name).toBe(createClinicDto.name);
    });

    it('should throw ValidationException when name is empty', async () => {
      const createClinicDto: CreateClinicDTO = {
        name: '',
        address: 'Ala B, 2º andar',
        city: 'São Paulo',
        state: 'SP',
        zipCode: '01234-567',
        phone: '+55 11 8888-8888',
        email: 'cardio@hospital.com',
        cnpj: '98.765.432/0001-10',
      };

      await expect(useCase.execute(createClinicDto)).rejects.toThrow(
        ValidationException,
      );
      expect(clinicRepository.create).not.toHaveBeenCalled();
    });

    it('should throw ValidationException when name has only spaces', async () => {
      const createClinicDto: CreateClinicDTO = {
        name: '   ',
        address: 'Ala B, 2º andar',
        city: 'São Paulo',
        state: 'SP',
        zipCode: '01234-567',
        phone: '+55 11 8888-8888',
        email: 'cardio@hospital.com',
        cnpj: '98.765.432/0001-10',
      };

      await expect(useCase.execute(createClinicDto)).rejects.toThrow(
        ValidationException,
      );
      expect(clinicRepository.create).not.toHaveBeenCalled();
    });

    it('should throw DatabaseException when repository fails', async () => {
      const createClinicDto: CreateClinicDTO = {
        name: 'Clínica Cardiologia',
        address: 'Ala B, 2º andar',
        city: 'São Paulo',
        state: 'SP',
        zipCode: '01234-567',
        phone: '+55 11 8888-8888',
        email: 'cardio@hospital.com',
        cnpj: '98.765.432/0001-10',
      };

      clinicRepository.create.mockRejectedValue(
        new Error('Database connection failed'),
      );

      await expect(useCase.execute(createClinicDto)).rejects.toThrow(
        DatabaseException,
      );
      expect(clinicRepository.create).toHaveBeenCalledWith(createClinicDto);
    });

    it('should create clinic with minimal required data', async () => {
      const createClinicDto: CreateClinicDTO = {
        name: 'Clínica Básica',
        address: 'Rua Principal, 100',
        city: 'Cidade',
        state: 'Estado',
        zipCode: '00000-000',
        phone: '+55 11 0000-0000',
        email: 'email@clinica.com',
        cnpj: '00.000.000/0001-00',
      };

      const minimalClinic = {
        ...mockClinic,
        name: 'Clínica Básica',
      };

      clinicRepository.create.mockResolvedValue(minimalClinic as any);

      const result = await useCase.execute(createClinicDto);

      expect(result).toBeDefined();
      expect(result.name).toBe('Clínica Básica');
    });
  });
});
