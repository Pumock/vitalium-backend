import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from '../user.controller';
import { CreateUserUseCase } from '../../../application/use-cases/user/create-user.use-case';
import { SearchUserUseCase } from '../../../application/use-cases/user/search-user.use-case';
import { UpdateUserUseCase } from '../../../application/use-cases/user/update-user.use-case';
import { DeleteUserUseCase } from '../../../application/use-cases/user/delete-user.use-case';
import { CreateUserDTO } from '../../dto/userDTO/create-user.dto';
import { UpdateUserDTO } from '../../dto/userDTO/update-user.dtp';
import { Role } from '../../../shared/enums/role.enum';

describe('UserController', () => {
  let controller: UserController;
  let createUserUseCase: jest.Mocked<CreateUserUseCase>;
  let searchUserUseCase: jest.Mocked<SearchUserUseCase>;
  let updateUserUseCase: jest.Mocked<UpdateUserUseCase>;
  let deleteUserUseCase: jest.Mocked<DeleteUserUseCase>;

  const mockUser = {
    id: '123e4567-e89b-12d3-a456-426614174000',
    email: 'john.doe@example.com',
    password: 'hashedPassword',
    firstName: 'John',
    lastName: 'Doe',
    phone: '+1234567890',
    avatar: 'avatar.jpg',
    isActive: true,
    role: Role.PATIENT,
    createdAt: '2023-01-01T00:00:00Z',
    updatedAt: '2023-01-01T00:00:00Z',
  };
  beforeEach(async () => {
    const mockCreateUserUseCase = {
      execute: jest.fn(),
    };

    const mockSearchUserUseCase = {
      findAll: jest.fn(),
      findById: jest.fn(),
      findByEmail: jest.fn(),
    };

    const mockUpdateUserUseCase = {
      execute: jest.fn(),
    };

    const mockDeleteUserUseCase = {
      execute: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: CreateUserUseCase,
          useValue: mockCreateUserUseCase,
        },
        {
          provide: SearchUserUseCase,
          useValue: mockSearchUserUseCase,
        },
        {
          provide: UpdateUserUseCase,
          useValue: mockUpdateUserUseCase,
        },
        {
          provide: DeleteUserUseCase,
          useValue: mockDeleteUserUseCase,
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
    createUserUseCase = module.get(CreateUserUseCase);
    searchUserUseCase = module.get(SearchUserUseCase);
    updateUserUseCase = module.get(UpdateUserUseCase);
    deleteUserUseCase = module.get(DeleteUserUseCase);
  });

  describe('create', () => {
    it('should create a new user successfully', async () => {
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

      createUserUseCase.execute.mockResolvedValue(mockUser);

      // Act
      const result = await controller.create(createUserDto);

      // Assert
      expect(createUserUseCase.execute).toHaveBeenCalledWith(createUserDto);
      expect(result).toBeDefined();
      expect(result.email).toBe(mockUser.email);
      expect(result.firstName).toBe(mockUser.firstName);
    });

    it('should handle validation errors when creating user', async () => {
      // Arrange
      const invalidCreateUserDto = {} as CreateUserDTO;
      const validationError = new Error('Validation failed');

      createUserUseCase.execute.mockRejectedValue(validationError);

      // Act & Assert
      await expect(controller.create(invalidCreateUserDto)).rejects.toThrow(
        'Validation failed',
      );
      expect(createUserUseCase.execute).toHaveBeenCalledWith(
        invalidCreateUserDto,
      );
    });
  });

  describe('findAll', () => {
    it('should return all users', async () => {
      // Arrange
      const mockUsers = [mockUser];
      searchUserUseCase.findAll.mockResolvedValue(mockUsers);

      // Act
      const result = await controller.findAll();

      // Assert
      expect(searchUserUseCase.findAll).toHaveBeenCalled();
      expect(result).toHaveLength(1);
      expect(result[0]).toBeDefined();
    });

    it('should return empty array when no users exist', async () => {
      // Arrange
      searchUserUseCase.findAll.mockResolvedValue([]);

      // Act
      const result = await controller.findAll();

      // Assert
      expect(searchUserUseCase.findAll).toHaveBeenCalled();
      expect(result).toHaveLength(0);
    });
  });

  describe('findOne', () => {
    it('should return user by id', async () => {
      // Arrange
      const userId = '123e4567-e89b-12d3-a456-426614174000';
      searchUserUseCase.findById.mockResolvedValue(mockUser);

      // Act
      const result = await controller.findOne(userId);

      // Assert
      expect(searchUserUseCase.findById).toHaveBeenCalledWith(userId);
      expect(result).toBeDefined();
      expect(result.id).toBe(mockUser.id);
    });

    it('should handle user not found', async () => {
      // Arrange
      const userId = 'non-existent-id';
      const notFoundError = new Error('User not found');

      searchUserUseCase.findById.mockRejectedValue(notFoundError);

      // Act & Assert
      await expect(controller.findOne(userId)).rejects.toThrow(
        'User not found',
      );
      expect(searchUserUseCase.findById).toHaveBeenCalledWith(userId);
    });
  });

  describe('findByEmail', () => {
    it('should return user by email', async () => {
      // Arrange
      const email = 'test@example.com';
      searchUserUseCase.findByEmail.mockResolvedValue(mockUser);

      // Act
      const result = await controller.findByEmail(email);

      // Assert
      expect(searchUserUseCase.findByEmail).toHaveBeenCalledWith(email);
      expect(result).toBeDefined();
      expect(result.email).toBe(mockUser.email);
    });
  });

  describe('update', () => {
    it('should update user successfully', async () => {
      // Arrange
      const userId = '123e4567-e89b-12d3-a456-426614174000';
      const updateUserDto: UpdateUserDTO = {
        firstName: 'Jane',
        isActive: false,
      };

      const updatedUser = { ...mockUser, ...updateUserDto };
      updateUserUseCase.execute.mockResolvedValue(updatedUser);

      // Act
      const result = await controller.update(userId, updateUserDto);

      // Assert
      expect(updateUserUseCase.execute).toHaveBeenCalledWith(
        userId,
        updateUserDto,
      );
      expect(result).toBeDefined();
      expect(result.firstName).toBe('Jane');
      expect(result.isActive).toBe(false);
    });

    it('should handle update validation errors', async () => {
      // Arrange
      const userId = '123e4567-e89b-12d3-a456-426614174000';
      const updateUserDto: UpdateUserDTO = {
        email: 'invalid-email',
      };

      const validationError = new Error('Invalid email format');
      updateUserUseCase.execute.mockRejectedValue(validationError);

      // Act & Assert
      await expect(controller.update(userId, updateUserDto)).rejects.toThrow(
        'Invalid email format',
      );
      expect(updateUserUseCase.execute).toHaveBeenCalledWith(
        userId,
        updateUserDto,
      );
    });
  });

  describe('delete', () => {
    it('should delete user successfully', async () => {
      // Arrange
      const userId = '123e4567-e89b-12d3-a456-426614174000';
      deleteUserUseCase.execute.mockResolvedValue(undefined);

      // Act
      await controller.delete(userId);

      // Assert
      expect(deleteUserUseCase.execute).toHaveBeenCalledWith(userId);
    });

    it('should handle delete errors', async () => {
      // Arrange
      const userId = 'non-existent-id';
      const deleteError = new Error('User not found for deletion');

      deleteUserUseCase.execute.mockRejectedValue(deleteError);

      // Act & Assert
      await expect(controller.delete(userId)).rejects.toThrow(
        'User not found for deletion',
      );
      expect(deleteUserUseCase.execute).toHaveBeenCalledWith(userId);
    });
  });
});
