import { Test, TestingModule } from '@nestjs/testing';
import { UserDataRepository } from '../user-data.repository';
import { PrismaProvider } from '../../../database/prisma.provider';
import { CreateUserDTO } from '../../../../presentation/dto/userDTO/create-user.dto';
import { UpdateUserDTO } from '../../../../presentation/dto/userDTO/update-user.dtp';
import { Role } from '../../../../shared/enums/role.enum';

describe('UserDataRepository', () => {
  let repository: UserDataRepository;
  let mockPrismaProvider: any;

  const mockUser = {
    id: 'user-123',
    email: 'test@example.com',
    password: 'hashedPassword123',
    firstName: 'João',
    lastName: 'Silva',
    phone: '+5511999999999',
    avatar: 'https://example.com/avatar.jpg',
    isActive: true,
    role: Role.PATIENT,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  };

  beforeEach(async () => {
    mockPrismaProvider = {
      user: {
        create: jest.fn(),
        findUnique: jest.fn(),
        findMany: jest.fn(),
        update: jest.fn(),
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserDataRepository,
        {
          provide: PrismaProvider,
          useValue: mockPrismaProvider,
        },
      ],
    }).compile();

    repository = module.get<UserDataRepository>(UserDataRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should create a user successfully', async () => {
      // Arrange
      const createUserDto: CreateUserDTO = {
        email: 'test@example.com',
        password: 'password123',
        firstName: 'João',
        lastName: 'Silva',
        phone: '+5511999999999',
        avatar: 'https://example.com/avatar.jpg',
        isActive: true,
        role: Role.PATIENT,
      };

      mockPrismaProvider.user.create.mockResolvedValue(mockUser);

      // Act
      const result = await repository.create(createUserDto);

      // Assert
      expect(mockPrismaProvider.user.create).toHaveBeenCalledWith({
        data: {
          email: createUserDto.email,
          password: createUserDto.password,
          firstName: createUserDto.firstName,
          lastName: createUserDto.lastName,
          phone: createUserDto.phone,
          avatar: createUserDto.avatar,
          isActive: true,
          role: createUserDto.role,
        },
      });
      expect(result).toBeDefined();
      expect(result.email).toBe(createUserDto.email);
      expect(result.firstName).toBe(createUserDto.firstName);
    });

    it('should handle database errors during user creation', async () => {
      // Arrange
      const createUserDto: CreateUserDTO = {
        email: 'test@example.com',
        password: 'password123',
        firstName: 'João',
        lastName: 'Silva',
        phone: '+5511999999999',
        isActive: true,
        role: Role.PATIENT,
      };

      mockPrismaProvider.user.create.mockRejectedValue(
        new Error('Database error'),
      );

      // Act & Assert
      await expect(repository.create(createUserDto)).rejects.toThrow(
        'Database error',
      );
    });
  });

  describe('findByEmail', () => {
    it('should find a user by email', async () => {
      // Arrange
      const email = 'test@example.com';
      mockPrismaProvider.user.findUnique.mockResolvedValue(mockUser);

      // Act
      const result = await repository.findByEmail(email);

      // Assert
      expect(mockPrismaProvider.user.findUnique).toHaveBeenCalledWith({
        where: {
          email,
          isActive: true,
        },
      });
      expect(result).toBeDefined();
      expect(result?.email).toBe(email);
    });

    it('should return null when user is not found by email', async () => {
      // Arrange
      const email = 'nonexistent@example.com';
      mockPrismaProvider.user.findUnique.mockResolvedValue(null);

      // Act
      const result = await repository.findByEmail(email);

      // Assert
      expect(result).toBeNull();
    });
  });

  describe('findById', () => {
    it('should find a user by id', async () => {
      // Arrange
      const userId = 'user-123';
      mockPrismaProvider.user.findUnique.mockResolvedValue(mockUser);

      // Act
      const result = await repository.findById(userId);

      // Assert
      expect(mockPrismaProvider.user.findUnique).toHaveBeenCalledWith({
        where: {
          id: userId,
          isActive: true,
        },
      });
      expect(result).toBeDefined();
      expect(result?.id).toBe(userId);
    });

    it('should return null when user is not found by id', async () => {
      // Arrange
      const userId = 'nonexistent-id';
      mockPrismaProvider.user.findUnique.mockResolvedValue(null);

      // Act
      const result = await repository.findById(userId);

      // Assert
      expect(result).toBeNull();
    });
  });

  describe('findAll', () => {
    it('should return all active users', async () => {
      // Arrange
      const mockUsers = [
        mockUser,
        { ...mockUser, id: 'user-456', email: 'user2@example.com' },
      ];
      mockPrismaProvider.user.findMany.mockResolvedValue(mockUsers);

      // Act
      const result = await repository.findAll();

      // Assert
      expect(mockPrismaProvider.user.findMany).toHaveBeenCalledWith({
        where: {
          isActive: true,
        },
        orderBy: { createdAt: 'desc' },
      });
      expect(result).toHaveLength(2);
      expect(result[0].id).toBe('user-123');
      expect(result[1].id).toBe('user-456');
    });

    it('should return empty array when no users found', async () => {
      // Arrange
      mockPrismaProvider.user.findMany.mockResolvedValue([]);

      // Act
      const result = await repository.findAll();

      // Assert
      expect(result).toEqual([]);
    });
  });

  describe('update', () => {
    it('should update a user successfully', async () => {
      // Arrange
      const userId = 'user-123';
      const updateUserDto: UpdateUserDTO = {
        firstName: 'João Updated',
        lastName: 'Silva Updated',
        phone: '+5511888888888',
      };

      const updatedUser = {
        ...mockUser,
        firstName: 'João Updated',
        lastName: 'Silva Updated',
        phone: '+5511888888888',
      };

      mockPrismaProvider.user.update.mockResolvedValue(updatedUser);

      // Act
      const result = await repository.update(userId, updateUserDto);

      // Assert
      expect(mockPrismaProvider.user.update).toHaveBeenCalledWith({
        where: {
          id: userId,
          isActive: true,
        },
        data: {
          email: updateUserDto.email,
          firstName: updateUserDto.firstName,
          lastName: updateUserDto.lastName,
          phone: updateUserDto.phone,
          avatar: updateUserDto.avatar,
          isActive: updateUserDto.isActive,
          role: updateUserDto.role,
          updatedAt: expect.any(Date),
        },
      });
      expect(result).toBeDefined();
      expect(result.firstName).toBe('João Updated');
      expect(result.lastName).toBe('Silva Updated');
    });

    it('should handle database errors during user update', async () => {
      // Arrange
      const userId = 'user-123';
      const updateUserDto: UpdateUserDTO = {
        firstName: 'João Updated',
      };

      mockPrismaProvider.user.update.mockRejectedValue(
        new Error('User not found'),
      );

      // Act & Assert
      await expect(repository.update(userId, updateUserDto)).rejects.toThrow(
        'User not found',
      );
    });
  });

  describe('delete', () => {
    it('should soft delete a user', async () => {
      // Arrange
      const userId = 'user-123';
      mockPrismaProvider.user.update.mockResolvedValue(undefined);

      // Act
      await repository.delete(userId);

      // Assert
      expect(mockPrismaProvider.user.update).toHaveBeenCalledWith({
        where: { id: userId },
        data: {
          isActive: false,
          updatedAt: expect.any(Date),
        },
      });
    });

    it('should handle database errors during user deletion', async () => {
      // Arrange
      const userId = 'nonexistent-id';
      mockPrismaProvider.user.update.mockRejectedValue(
        new Error('User not found'),
      );

      // Act & Assert
      await expect(repository.delete(userId)).rejects.toThrow('User not found');
    });
  });
});
