import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../src/modules/app.module';
import { PrismaProvider } from '../../src/infrastructure/database/prisma.provider';
import { Role } from '../../src/shared/enums/role.enum';

describe('Users API (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaProvider;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    // Configure validation pipe
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
        transformOptions: {
          enableImplicitConversion: true,
        },
      }),
    );

    prisma = app.get<PrismaProvider>(PrismaProvider);

    await app.init();
  });

  afterAll(async () => {
    // Clean up test data
    await prisma.user.deleteMany({
      where: {
        email: {
          contains: 'test-e2e',
        },
      },
    });

    await prisma.$disconnect();
    await app.close();
  });

  beforeEach(async () => {
    // Clean up test data before each test
    await prisma.user.deleteMany({
      where: {
        email: {
          contains: 'test-e2e',
        },
      },
    });
  });

  describe('/users (POST)', () => {
    it('should create a new user', async () => {
      const createUserDto = {
        email: 'test-e2e-create@example.com',
        password: 'TestPassword123!',
        firstName: 'John',
        lastName: 'Doe',
        phone: '+1234567890',
        avatar: 'https://example.com/avatar.jpg',
        isActive: true,
        role: Role.PATIENT,
      };

      const response = await request(app.getHttpServer())
        .post('/users')
        .send(createUserDto)
        .expect(201);

      expect(response.body).toMatchObject({
        email: createUserDto.email,
        firstName: createUserDto.firstName,
        lastName: createUserDto.lastName,
        phone: createUserDto.phone,
        avatar: createUserDto.avatar,
        isActive: createUserDto.isActive,
        role: createUserDto.role,
      });

      expect(response.body.id).toBeDefined();
      expect(response.body.createdAt).toBeDefined();
      expect(response.body.updatedAt).toBeDefined();
    });

    it('should return 400 for invalid email format', async () => {
      const invalidUserDto = {
        email: 'invalid-email',
        firstName: 'John',
        lastName: 'Doe',
        isActive: true,
        role: Role.PATIENT,
      };

      await request(app.getHttpServer())
        .post('/users')
        .send(invalidUserDto)
        .expect(400);
    });

    it('should return 400 for missing required fields', async () => {
      const incompleteUserDto = {
        email: 'test-e2e-incomplete@example.com',
        // Missing firstName, lastName, isActive, role
      };

      await request(app.getHttpServer())
        .post('/users')
        .send(incompleteUserDto)
        .expect(400);
    });

    it('should return 409 for duplicate email', async () => {
      const createUserDto = {
        email: 'test-e2e-duplicate@example.com',
        password: 'TestPassword123!',
        firstName: 'John',
        lastName: 'Doe',
        isActive: true,
        role: Role.PATIENT,
      };

      // Create first user
      await request(app.getHttpServer())
        .post('/users')
        .send(createUserDto)
        .expect(201);

      // Try to create user with same email
      await request(app.getHttpServer())
        .post('/users')
        .send(createUserDto)
        .expect(409);
    });
  });

  describe('/users (GET)', () => {
    it('should return all users', async () => {
      // Create test users
      const testUsers = [
        {
          email: 'test-e2e-list1@example.com',
          password: 'TestPassword123!',
          firstName: 'John',
          lastName: 'Doe',
          isActive: true,
          role: Role.PATIENT,
        },
        {
          email: 'test-e2e-list2@example.com',
          password: 'TestPassword123!',
          firstName: 'Jane',
          lastName: 'Smith',
          isActive: true,
          role: Role.DOCTOR,
        },
      ];

      for (const user of testUsers) {
        await request(app.getHttpServer())
          .post('/users')
          .send(user)
          .expect(201);
      }

      const response = await request(app.getHttpServer())
        .get('/users')
        .expect(200);

      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBeGreaterThanOrEqual(2);

      const createdUsers = response.body.filter((user: any) =>
        user.email.includes('test-e2e-list'),
      );
      expect(createdUsers.length).toBe(2);
    });

    it('should return empty array when no users exist', async () => {
      const response = await request(app.getHttpServer())
        .get('/users')
        .expect(200);

      expect(Array.isArray(response.body)).toBe(true);
    });
  });

  describe('/users/:id (GET)', () => {
    it('should return user by id', async () => {
      // Create test user
      const createUserDto = {
        email: 'test-e2e-get-by-id@example.com',
        password: 'TestPassword123!',
        firstName: 'John',
        lastName: 'Doe',
        isActive: true,
        role: Role.PATIENT,
      };

      const createResponse = await request(app.getHttpServer())
        .post('/users')
        .send(createUserDto)
        .expect(201);

      const userId = createResponse.body.id;

      const response = await request(app.getHttpServer())
        .get(`/users/${userId}`)
        .expect(200);

      expect(response.body).toMatchObject({
        id: userId,
        email: createUserDto.email,
        firstName: createUserDto.firstName,
        lastName: createUserDto.lastName,
        isActive: createUserDto.isActive,
        role: createUserDto.role,
      });
    });

    it('should return 404 for non-existent user', async () => {
      const nonExistentId = '123e4567-e89b-12d3-a456-426614174000';

      await request(app.getHttpServer())
        .get(`/users/${nonExistentId}`)
        .expect(404);
    });
  });

  describe('/users/email/:email (GET)', () => {
    it('should return user by email', async () => {
      // Create test user
      const createUserDto = {
        email: 'test-e2e-get-by-email@example.com',
        password: 'TestPassword123!',
        firstName: 'John',
        lastName: 'Doe',
        isActive: true,
        role: Role.PATIENT,
      };

      await request(app.getHttpServer())
        .post('/users')
        .send(createUserDto)
        .expect(201);

      const response = await request(app.getHttpServer())
        .get(`/users/email/${createUserDto.email}`)
        .expect(200);

      expect(response.body).toMatchObject({
        email: createUserDto.email,
        firstName: createUserDto.firstName,
        lastName: createUserDto.lastName,
        isActive: createUserDto.isActive,
        role: createUserDto.role,
      });
    });

    it('should return 404 for non-existent email', async () => {
      const nonExistentEmail = 'non-existent@example.com';

      await request(app.getHttpServer())
        .get(`/users/email/${nonExistentEmail}`)
        .expect(404);
    });
  });

  describe('/users/:id (PATCH)', () => {
    it('should update user successfully', async () => {
      // Create test user
      const createUserDto = {
        email: 'test-e2e-update@example.com',
        password: 'TestPassword123!',
        firstName: 'John',
        lastName: 'Doe',
        isActive: true,
        role: Role.PATIENT,
      };

      const createResponse = await request(app.getHttpServer())
        .post('/users')
        .send(createUserDto)
        .expect(201);

      const userId = createResponse.body.id;

      // Update user
      const updateUserDto = {
        firstName: 'Jane',
        lastName: 'Smith',
        isActive: false,
      };

      const response = await request(app.getHttpServer())
        .patch(`/users/${userId}`)
        .send(updateUserDto)
        .expect(200);

      expect(response.body).toMatchObject({
        id: userId,
        email: createUserDto.email,
        firstName: updateUserDto.firstName,
        lastName: updateUserDto.lastName,
        isActive: updateUserDto.isActive,
        role: createUserDto.role,
      });
    });

    it('should return 404 for non-existent user update', async () => {
      const nonExistentId = '123e4567-e89b-12d3-a456-426614174000';
      const updateUserDto = {
        firstName: 'Updated Name',
      };

      await request(app.getHttpServer())
        .patch(`/users/${nonExistentId}`)
        .send(updateUserDto)
        .expect(404);
    });
  });

  describe('/users/:id (DELETE)', () => {
    it('should delete user successfully', async () => {
      // Create test user
      const createUserDto = {
        email: 'test-e2e-delete@example.com',
        password: 'TestPassword123!',
        firstName: 'John',
        lastName: 'Doe',
        isActive: true,
        role: Role.PATIENT,
      };

      const createResponse = await request(app.getHttpServer())
        .post('/users')
        .send(createUserDto)
        .expect(201);

      const userId = createResponse.body.id;

      // Delete user
      await request(app.getHttpServer()).delete(`/users/${userId}`).expect(204);

      // Verify user is deleted
      await request(app.getHttpServer()).get(`/users/${userId}`).expect(404);
    });

    it('should return 404 for non-existent user deletion', async () => {
      const nonExistentId = '123e4567-e89b-12d3-a456-426614174000';

      await request(app.getHttpServer())
        .delete(`/users/${nonExistentId}`)
        .expect(404);
    });
  });
});
