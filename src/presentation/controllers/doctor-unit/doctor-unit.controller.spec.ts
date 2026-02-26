import { Test, TestingModule } from '@nestjs/testing';
import { DoctorUnitController } from './doctor-unit.controller';
import { CreateDoctorUnitUseCase } from '../../../application/use-cases/doctor-unit/create-doctor-unit.use-case';
import { CreateDoctorUnitDTO } from '../../dto/doctor-unitDTO/create-doctor-unit.dto';
import { ConflictException } from '../../../shared/execeptions/system/conflict.exception';

describe('DoctorUnitController', () => {
  let controller: DoctorUnitController;
  let createDoctorUnitUseCase: jest.Mocked<CreateDoctorUnitUseCase>;

  const mockDoctorUnit = {
    id: 'doctor-unit-id-1',
    doctorId: 'doctor-id-1',
    unitId: 'unit-id-1',
    consultationPrice: 150.0,
    isPrimary: true,
    isActive: true,
    createdAt: new Date('2025-01-01'),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DoctorUnitController],
      providers: [
        {
          provide: CreateDoctorUnitUseCase,
          useValue: {
            execute: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<DoctorUnitController>(DoctorUnitController);
    createDoctorUnitUseCase = module.get(CreateDoctorUnitUseCase);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    const createDoctorUnitDTO: CreateDoctorUnitDTO = {
      doctorId: 'doctor-id-1',
      unitId: 'unit-id-1',
      consultationPrice: 150.0,
      isPrimary: true,
      isActive: true,
    };

    it('should create a doctor-unit relationship successfully', async () => {
      createDoctorUnitUseCase.execute.mockResolvedValue(mockDoctorUnit);

      const result = await controller.create(createDoctorUnitDTO);

      expect(createDoctorUnitUseCase.execute).toHaveBeenCalledWith(
        createDoctorUnitDTO,
      );
      expect(result).toBeDefined();
      expect(result.doctorId).toBe(mockDoctorUnit.doctorId);
      expect(result.unitId).toBe(mockDoctorUnit.unitId);
      expect(result.id).toBe(mockDoctorUnit.id);
    });

    it('should create a doctor-unit without optional fields', async () => {
      const minimalDTO: CreateDoctorUnitDTO = {
        doctorId: 'doctor-id-1',
        unitId: 'unit-id-1',
      };

      const minimalResult = {
        ...mockDoctorUnit,
        consultationPrice: undefined,
        isPrimary: false,
        isActive: true,
      };

      createDoctorUnitUseCase.execute.mockResolvedValue(minimalResult);

      const result = await controller.create(minimalDTO);

      expect(result).toBeDefined();
      expect(result.doctorId).toBe('doctor-id-1');
      expect(result.unitId).toBe('unit-id-1');
    });

    it('should propagate ConflictException for duplicate relationship', async () => {
      createDoctorUnitUseCase.execute.mockRejectedValue(
        new ConflictException(
          'Relação médico-unidade já existe',
          'doctorId_unitId',
          'doctor-id-1_unit-id-1',
        ),
      );

      await expect(controller.create(createDoctorUnitDTO)).rejects.toThrow(
        ConflictException,
      );
    });

    it('should propagate errors from use case', async () => {
      createDoctorUnitUseCase.execute.mockRejectedValue(
        new Error('Unexpected error'),
      );

      await expect(controller.create(createDoctorUnitDTO)).rejects.toThrow(
        'Unexpected error',
      );
    });
  });
});
