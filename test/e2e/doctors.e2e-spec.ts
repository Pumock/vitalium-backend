import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../src/modules/app.module';
import { PrismaProvider } from '../../src/infrastructure/database/prisma.provider';
import { Role } from '../../src/shared/enums/role.enum';

describe('Doctors API (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaProvider;
  let createdUserId: string;
  let createdDoctorId: string;

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
  }, 30000);

  afterAll(async () => {
    // Clean up test data
    await prisma.doctor.deleteMany({
      where: {
        crm: {
          contains: 'test-e2e',
        },
      },
    });

    await prisma.user.deleteMany({
      where: {
        email: {
          contains: 'doctor-test-e2e',
        },
      },
    });

    await prisma.$disconnect();
    await app.close();
  });

  beforeEach(async () => {
    // Clean up test data before each test
    await prisma.doctor.deleteMany({
      where: {
        crm: {
          contains: 'test-e2e',
        },
      },
    });

    await prisma.user.deleteMany({
      where: {
        email: {
          contains: 'doctor-test-e2e',
        },
      },
    });

    // Create a test user for doctor creation
    const testUser = await prisma.user.create({
      data: {
        email: 'doctor-test-e2e-user@example.com',
        password: 'hashedPassword123',
        firstName: 'Dr. João',
        lastName: 'Silva',
        phone: '+5511999999999',
        isActive: true,
        role: Role.DOCTOR,
      },
    });
    createdUserId = testUser.id;
  });

  describe('/doctors (POST)', () => {
    it('should create a new doctor', async () => {
      const createDoctorDto = {
        crm: 'test-e2e-CRM123456',
        crmState: true,
        isActive: true,
        userId: createdUserId,
      };

      const response = await request(app.getHttpServer())
        .post('/doctors')
        .send(createDoctorDto)
        .expect(201);

      expect(response.body).toMatchObject({
        crm: createDoctorDto.crm,
        crmState: createDoctorDto.crmState,
        isActive: createDoctorDto.isActive,
      });

      expect(response.body.id).toBeDefined();
      expect(response.body.createdAt).toBeDefined();
      expect(response.body.updatedAt).toBeDefined();
      expect(response.body.user).toBeDefined();
      expect(response.body.user.id).toBe(createdUserId);

      createdDoctorId = response.body.id;
    });

    it('should return 400 for invalid CRM format', async () => {
      const invalidDoctorDto = {
        crm: '', // Empty CRM
        crmState: true,
        consultationPrice: 150.0,
        isActive: true,
        user: {
          id: createdUserId,
        },
      };

      await request(app.getHttpServer())
        .post('/doctors')
        .send(invalidDoctorDto)
        .expect(400);
    });

    it('should return 400 for non-existent user', async () => {
      const invalidDoctorDto = {
        crm: 'test-e2e-CRM789012',
        crmState: true,
        consultationPrice: 150.0,
        isActive: true,
        userId: 'non-existent-user-id',
      };

      await request(app.getHttpServer())
        .post('/doctors')
        .send(invalidDoctorDto)
        .expect(400);
    });

    it('should return 400 for user with wrong role', async () => {
      // Create a user with PATIENT role
      const patientUser = await prisma.user.create({
        data: {
          email: 'doctor-test-e2e-patient@example.com',
          password: 'hashedPassword123',
          firstName: 'Patient',
          lastName: 'User',
          phone: '+5511888888888',
          isActive: true,
          role: Role.PATIENT,
        },
      });

      const invalidDoctorDto = {
        crm: 'test-e2e-CRM789012',
        crmState: true,
        consultationPrice: 150.0,
        isActive: true,
        userId: patientUser.id,
      };

      await request(app.getHttpServer())
        .post('/doctors')
        .send(invalidDoctorDto)
        .expect(400);

      // Clean up
      try {
        await prisma.user.delete({
          where: { id: patientUser.id },
        });
      } catch (error) {
        // User may already be deleted, ignore error
      }
    });
  });

  describe('/doctors (GET)', () => {
    beforeEach(async () => {
      // Create a test doctor
      const createDoctorDto = {
        crm: 'test-e2e-CRM555666',
        crmState: true,
        consultationPrice: 200.0,
        isActive: true,
        userId: createdUserId,
      };

      const response = await request(app.getHttpServer())
        .post('/doctors')
        .send(createDoctorDto);

      createdDoctorId = response.body.id;
    });

    it('should return all doctors', async () => {
      const response = await request(app.getHttpServer())
        .get('/doctors')
        .expect(200);

      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBeGreaterThanOrEqual(1);

      const doctor = response.body.find((d: any) => d.id === createdDoctorId);
      expect(doctor).toBeDefined();
      expect(doctor.crm).toBe('test-e2e-CRM555666');
    });

    it('should return a specific doctor by ID', async () => {
      const response = await request(app.getHttpServer())
        .get(`/doctors/${createdDoctorId}`)
        .expect(200);

      expect(response.body).toMatchObject({
        id: createdDoctorId,
        crm: 'test-e2e-CRM555666',
        crmState: true,
        consultationPrice: 200.0,
        isActive: true,
      });

      expect(response.body.user).toBeDefined();
      expect(response.body.user.id).toBe(createdUserId);
    });

    it('should return 404 for non-existent doctor', async () => {
      await request(app.getHttpServer())
        .get('/doctors/non-existent-id')
        .expect(404);
    });
  });

  describe('/doctors/:id (PATCH)', () => {
    beforeEach(async () => {
      // Create a test doctor
      const createDoctorDto = {
        crm: 'test-e2e-CRM777888',
        crmState: true,
        consultationPrice: 180.0,
        isActive: true,
        userId: createdUserId,
      };

      const response = await request(app.getHttpServer())
        .post('/doctors')
        .send(createDoctorDto);

      createdDoctorId = response.body.id;
    });

    it('should update a doctor', async () => {
      const updateDoctorDto = {
        crm: 'test-e2e-CRM777888-updated',
        consultationPrice: 220.0,
        crmState: true,
      };

      const response = await request(app.getHttpServer())
        .patch(`/doctors/${createdDoctorId}`)
        .send(updateDoctorDto)
        .expect(200);

      expect(response.body).toMatchObject({
        id: createdDoctorId,
        consultationPrice: 220.0,
        crmState: true,
        crm: 'test-e2e-CRM777888-updated',
        isActive: true,
      });
    });

    it('should return 404 for non-existent doctor update', async () => {
      const updateDoctorDto = {
        crm: 'test-e2e-CRM-nonexistent',
        consultationPrice: 250.0,
      };

      await request(app.getHttpServer())
        .patch('/doctors/non-existent-id')
        .send(updateDoctorDto)
        .expect(404);
    });
  });

  describe('/doctors/:id (DELETE)', () => {
    beforeEach(async () => {
      // Create a test doctor
      const createDoctorDto = {
        crm: 'test-e2e-CRM999000',
        crmState: true,
        consultationPrice: 160.0,
        isActive: true,
        userId: createdUserId,
      };

      const response = await request(app.getHttpServer())
        .post('/doctors')
        .send(createDoctorDto);

      createdDoctorId = response.body.id;
    });

    it('should delete a doctor', async () => {
      await request(app.getHttpServer())
        .delete(`/doctors/${createdDoctorId}`)
        .expect(204);

      // Verify doctor was deleted
      await request(app.getHttpServer())
        .get(`/doctors/${createdDoctorId}`)
        .expect(404);
    });

    it('should return 404 for non-existent doctor deletion', async () => {
      await request(app.getHttpServer())
        .delete('/doctors/non-existent-id')
        .expect(404);
    });
  });
});
