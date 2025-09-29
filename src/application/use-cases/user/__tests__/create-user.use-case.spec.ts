import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserUseCase } from '../create-user.use-case';
import { IUserRepository } from 'src/domain/interfaces/repositories/user.repository.interface';
import { CreateUserDTO } from 'src/presentation/dto/userDTO/create-user.dto';
import { Role } from 'src/shared/enums/role.enum';
import { ValidationException } from 'src/shared/execeptions/system/validation.exception';

describe('CreateUserUseCase', () => {
  let useCase: CreateUserUseCase;
  let userRepository: jest.Mocked<IUserRepository>;

  const mockUser = {
    id: '123e4567-e89b-12d3-a456-426614174000',
    email: 'test@example.com',
    password: 'hashedPassword123',
    firstName: 'John',
    lastName: 'Doe',
    phone: '+1234567890',
    avatar: 'https://example.com/avatar.jpg',
    isActive: true,
    role: Role.PATIENT,
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-01-01T00:00:00.000Z',
  };

  beforeEach(async () => {
    const mockUserRepository = {
      create: jest.fn(),
      findByEmail: jest.fn(),
      findById: jest.fn(),
      findAll: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateUserUseCase,
        {
          provide: 'UserRepository',
          useValue: mockUserRepository,
        },
      ],
    }).compile();

    useCase = module.get<CreateUserUseCase>(CreateUserUseCase);
    userRepository = module.get('UserRepository');
  });

  describe('execute', () => {
    it('should create user successfully with valid data', async () => {
      // Arrange
      const createUserDto: CreateUserDTO = {
        email: 'test@example.com',
        firstName: 'John',
        lastName: 'Doe',
        phone: '+1234567890',
        avatar: 'https://example.com/avatar.jpg',
        isActive: true,
        role: Role.PATIENT,
        createdAt: '2024-01-01T00:00:00.000Z',
        updatedAt: '2024-01-01T00:00:00.000Z',
      };

      userRepository.findByEmail.mockResolvedValue(null);
      userRepository.create.mockResolvedValue(mockUser);

      // Act
      const result = await useCase.execute(createUserDto);

      // Assert
      expect(userRepository.findByEmail).toHaveBeenCalledWith(
        createUserDto.email,
      );
      expect(userRepository.create).toHaveBeenCalledWith(createUserDto);
      expect(result).toEqual(mockUser);
    });

    it('should throw ValidationException for duplicate email', async () => {
      // Arrange
      const createUserDto: CreateUserDTO = {
        email: 'existing@example.com',
        firstName: 'John',
        lastName: 'Doe',
        isActive: true,
        role: Role.PATIENT,
        createdAt: '2024-01-01T00:00:00.000Z',
        updatedAt: '2024-01-01T00:00:00.000Z',
      };

      userRepository.findByEmail.mockResolvedValue(mockUser);

      // Act & Assert
      await expect(useCase.execute(createUserDto)).rejects.toThrow(
        ValidationException,
      );
      expect(userRepository.findByEmail).toHaveBeenCalledWith(
        createUserDto.email,
      );
      expect(userRepository.create).not.toHaveBeenCalled();
    });

    it('should validate required fields', async () => {
      // Arrange
      const invalidCreateUserDto = {
        email: '', // Empty email
        firstName: '',
        lastName: '',
        isActive: true,
        role: Role.PATIENT,
        createdAt: '2024-01-01T00:00:00.000Z',
        updatedAt: '2024-01-01T00:00:00.000Z',
      } as CreateUserDTO;

      // Act & Assert
      await expect(useCase.execute(invalidCreateUserDto)).rejects.toThrow(
        ValidationException,
      );
      expect(userRepository.create).not.toHaveBeenCalled();
    });

    it('should validate email format', async () => {
      // Arrange
      const invalidEmailDto: CreateUserDTO = {
        email: 'invalid-email-format',
        firstName: 'John',
        lastName: 'Doe',
        isActive: true,
        role: Role.PATIENT,
        createdAt: '2024-01-01T00:00:00.000Z',
        updatedAt: '2024-01-01T00:00:00.000Z',
      };

      // Act & Assert
      await expect(useCase.execute(invalidEmailDto)).rejects.toThrow(
        ValidationException,
      );
      expect(userRepository.create).not.toHaveBeenCalled();
    });

    it('should validate name length', async () => {
      // Arrange
      const shortNameDto: CreateUserDTO = {
        email: 'test@example.com',
        firstName: 'A', // Too short
        lastName: 'B', // Too short
        isActive: true,
        role: Role.PATIENT,
        createdAt: '2024-01-01T00:00:00.000Z',
        updatedAt: '2024-01-01T00:00:00.000Z',
      };

      // Act & Assert
      await expect(useCase.execute(shortNameDto)).rejects.toThrow(
        ValidationException,
      );
      expect(userRepository.create).not.toHaveBeenCalled();
    });

    it('should validate role enum', async () => {
      // Arrange
      const invalidRoleDto: CreateUserDTO = {
        email: 'test@example.com',
        firstName: 'John',
        lastName: 'Doe',
        isActive: true,
        role: 'INVALID_ROLE' as Role,
        createdAt: '2024-01-01T00:00:00.000Z',
        updatedAt: '2024-01-01T00:00:00.000Z',
      };

      // Act & Assert
      await expect(useCase.execute(invalidRoleDto)).rejects.toThrow(
        ValidationException,
      );
      expect(userRepository.create).not.toHaveBeenCalled();
    });

    it('should handle repository errors', async () => {
      // Arrange
      const createUserDto: CreateUserDTO = {
        email: 'test@example.com',
        firstName: 'John',
        lastName: 'Doe',
        isActive: true,
        role: Role.PATIENT,
        createdAt: '2024-01-01T00:00:00.000Z',
        updatedAt: '2024-01-01T00:00:00.000Z',
      };

      userRepository.findByEmail.mockResolvedValue(null);
      userRepository.create.mockRejectedValue(
        new Error('Database connection failed'),
      );

      // Act & Assert
      await expect(useCase.execute(createUserDto)).rejects.toThrow(
        'Erro na operação de banco de dados',
      );
      expect(userRepository.findByEmail).toHaveBeenCalledWith(
        createUserDto.email,
      );
      expect(userRepository.create).toHaveBeenCalledWith(createUserDto);
    });
  });
});
