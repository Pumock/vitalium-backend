import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../src/modules/app.module';
import { PrismaProvider } from '../../src/infrastructure/database/prisma.provider';

describe('Hospitals API (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaProvider;
  let createdHospitalId: string;

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
    await prisma.hospital.deleteMany({
      where: {
        name: {
          contains: 'test-e2e',
        },
      },
    });

    await prisma.$disconnect();
    await app.close();
  });

  beforeEach(async () => {
    // Clean up test data before each test
    await prisma.hospital.deleteMany({
      where: {
        name: {
          contains: 'test-e2e',
        },
      },
    });
  });

  describe('/organizations/hospitals (POST)', () => {
    it('should create a new hospital', async () => {
      const createHospitalDto = {
        name: 'test-e2e-Hospital São Paulo',
        address: 'Rua das Flores, 123',
        city: 'São Paulo',
        state: 'SP',
        zipCode: '01234-567',
        phone: '+55 11 9999-9999',
        email: 'contato@test-e2e-hospital.com',
        cnpj: '12.345.678/0001-90',
      };

      const response = await request(app.getHttpServer())
        .post('/organizations/hospitals')
        .send(createHospitalDto)
        .expect(201);

      expect(response.body).toMatchObject({
        name: createHospitalDto.name,
        address: createHospitalDto.address,
        city: createHospitalDto.city,
        state: createHospitalDto.state,
        zipCode: createHospitalDto.zipCode,
        phone: createHospitalDto.phone,
        email: createHospitalDto.email,
        cnpj: createHospitalDto.cnpj,
      });

      expect(response.body.id).toBeDefined();
      expect(response.body.createdAt).toBeDefined();
      expect(response.body.updatedAt).toBeDefined();

      createdHospitalId = response.body.id;
    });

    it('should return 400 for invalid hospital data', async () => {
      const invalidHospitalDto = {
        name: '', // Empty name
        address: 'Rua das Flores, 123',
        city: 'São Paulo',
        state: 'SP',
        zipCode: '01234-567',
        phone: '+55 11 9999-9999',
        email: 'invalid-email', // Invalid email format
        cnpj: '12.345.678/0001-90',
      };

      await request(app.getHttpServer())
        .post('/organizations/hospitals')
        .send(invalidHospitalDto)
        .expect(400);
    });

    it('should return 400 for missing required fields', async () => {
      const incompleteHospitalDto = {
        name: 'test-e2e-Hospital Incomplete',
        // Missing required fields
      };

      await request(app.getHttpServer())
        .post('/organizations/hospitals')
        .send(incompleteHospitalDto)
        .expect(400);
    });
  });

  describe('/organizations/hospitals/:id (GET)', () => {
    beforeEach(async () => {
      // Create a test hospital
      const createHospitalDto = {
        name: 'test-e2e-Hospital Rio de Janeiro',
        address: 'Avenida Copacabana, 456',
        city: 'Rio de Janeiro',
        state: 'RJ',
        zipCode: '22000-000',
        phone: '+55 21 8888-8888',
        email: 'contato@test-e2e-hospitalrj.com',
        cnpj: '98.765.432/0001-10',
      };

      const response = await request(app.getHttpServer())
        .post('/organizations/hospitals')
        .send(createHospitalDto);

      createdHospitalId = response.body.id;
    });

    it('should return a specific hospital by ID', async () => {
      const response = await request(app.getHttpServer())
        .get(`/organizations/hospitals/${createdHospitalId}`)
        .expect(200);

      expect(response.body).toMatchObject({
        id: createdHospitalId,
        name: 'test-e2e-Hospital Rio de Janeiro',
        address: 'Avenida Copacabana, 456',
        city: 'Rio de Janeiro',
        state: 'RJ',
        zipCode: '22000-000',
        phone: '+55 21 8888-8888',
        email: 'contato@test-e2e-hospitalrj.com',
        cnpj: '98.765.432/0001-10',
      });

      expect(response.body.createdAt).toBeDefined();
      expect(response.body.updatedAt).toBeDefined();
    });

    it('should return 404 for non-existent hospital', async () => {
      await request(app.getHttpServer())
        .get('/organizations/hospitals/non-existent-id')
        .expect(404);
    });
  });

  describe('/organizations/hospitals/:id (PATCH)', () => {
    beforeEach(async () => {
      // Create a test hospital
      const createHospitalDto = {
        name: 'test-e2e-Hospital Belo Horizonte',
        address: 'Rua da Liberdade, 789',
        city: 'Belo Horizonte',
        state: 'MG',
        zipCode: '30000-000',
        phone: '+55 31 7777-7777',
        email: 'contato@test-e2e-hospitalmg.com',
        cnpj: '11.222.333/0001-44',
      };

      const response = await request(app.getHttpServer())
        .post('/organizations/hospitals')
        .send(createHospitalDto);

      createdHospitalId = response.body.id;
    });

    it('should update a hospital', async () => {
      const updateHospitalDto = {
        name: 'test-e2e-Hospital Belo Horizonte Updated',
        phone: '+55 31 6666-6666',
        email: 'novo-contato@test-e2e-hospitalmg.com',
      };

      const response = await request(app.getHttpServer())
        .patch(`/organizations/hospitals/${createdHospitalId}`)
        .send(updateHospitalDto)
        .expect(200);

      expect(response.body).toMatchObject({
        id: createdHospitalId,
        name: 'test-e2e-Hospital Belo Horizonte Updated',
        phone: '+55 31 6666-6666',
        email: 'novo-contato@test-e2e-hospitalmg.com',
        // Other fields should remain unchanged
        address: 'Rua da Liberdade, 789',
        city: 'Belo Horizonte',
        state: 'MG',
        zipCode: '30000-000',
        cnpj: '11.222.333/0001-44',
      });
    });

    it('should return 404 for non-existent hospital update', async () => {
      const updateHospitalDto = {
        name: 'Updated Hospital Name',
      };

      await request(app.getHttpServer())
        .patch('/organizations/hospitals/non-existent-id')
        .send(updateHospitalDto)
        .expect(404);
    });

    it('should return 400 for invalid update data', async () => {
      const invalidUpdateDto = {
        email: 'invalid-email-format', // Invalid email
      };

      await request(app.getHttpServer())
        .patch(`/organizations/hospitals/${createdHospitalId}`)
        .send(invalidUpdateDto)
        .expect(400);
    });
  });

  describe('/organizations/hospitals/:id (DELETE)', () => {
    beforeEach(async () => {
      // Create a test hospital
      const createHospitalDto = {
        name: 'test-e2e-Hospital Porto Alegre',
        address: 'Rua dos Andradas, 321',
        city: 'Porto Alegre',
        state: 'RS',
        zipCode: '90000-000',
        phone: '+55 51 5555-5555',
        email: 'contato@test-e2e-hospitalrs.com',
        cnpj: '55.666.777/0001-88',
      };

      const response = await request(app.getHttpServer())
        .post('/organizations/hospitals')
        .send(createHospitalDto);

      createdHospitalId = response.body.id;
    });

    it('should delete a hospital', async () => {
      await request(app.getHttpServer())
        .delete(`/organizations/hospitals/${createdHospitalId}`)
        .expect(204);

      // Verify hospital was deleted
      await request(app.getHttpServer())
        .get(`/organizations/hospitals/${createdHospitalId}`)
        .expect(404);
    });

    it('should return 404 for non-existent hospital deletion', async () => {
      await request(app.getHttpServer())
        .delete('/organizations/hospitals/non-existent-id')
        .expect(404);
    });
  });
});
