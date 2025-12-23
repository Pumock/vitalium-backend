// import { Test, TestingModule } from '@nestjs/testing';
// import { INestApplication, ValidationPipe } from '@nestjs/common';
// import * as request from 'supertest';
// import { AppModule } from '../../src/modules/app.module';
// import { PrismaProvider } from '../../src/infrastructure/database/prisma.provider';

// describe('Clinics API (e2e)', () => {
//   let app: INestApplication;
//   let prisma: PrismaProvider;
//   let createdClinicId: string;

//   beforeAll(async () => {
//     const moduleFixture: TestingModule = await Test.createTestingModule({
//       imports: [AppModule],
//     }).compile();

//     app = moduleFixture.createNestApplication();

//     // Configure validation pipe
//     app.useGlobalPipes(
//       new ValidationPipe({
//         whitelist: true,
//         forbidNonWhitelisted: true,
//         transform: true,
//         transformOptions: {
//           enableImplicitConversion: true,
//         },
//       }),
//     );

//     prisma = app.get<PrismaProvider>(PrismaProvider);

//     await app.init();
//   }, 30000);

//   afterAll(async () => {
//     // Clean up test data
//     await prisma.clinic.deleteMany({
//       where: {
//         name: {
//           contains: 'test-e2e',
//         },
//       },
//     });

//     await prisma.$disconnect();
//     await app.close();
//   });

//   beforeEach(async () => {
//     // Clean up test data before each test
//     await prisma.clinic.deleteMany({
//       where: {
//         name: {
//           contains: 'test-e2e',
//         },
//       },
//     });
//   });

//   describe('/organizations/clinics (POST)', () => {
//     it('should create a new clinic', async () => {
//       const timestamp = Date.now();
//       const createClinicDto = {
//         name: 'test-e2e-Clínica Cardiologia',
//         address: 'Ala B, 2º andar',
//         city: 'São Paulo',
//         state: 'SP',
//         zipCode: '01234-567',
//         phone: '+55 11 8888-8888',
//         email: `cardio-${timestamp}@test-e2e-clinic.com`,
//         cnpj: `98.765.432/0001-${String(timestamp).slice(-2)}`,
//       };

//       const response = await request(app.getHttpServer())
//         .post('/organizations/clinics')
//         .send(createClinicDto)
//         .expect(201);

//       expect(response.body).toMatchObject({
//         name: createClinicDto.name,
//         address: createClinicDto.address,
//         city: createClinicDto.city,
//         state: createClinicDto.state,
//         zipCode: createClinicDto.zipCode,
//         phone: createClinicDto.phone,
//         email: createClinicDto.email,
//         cnpj: createClinicDto.cnpj,
//       });

//       expect(response.body.id).toBeDefined();
//       expect(response.body.createdAt).toBeDefined();
//       expect(response.body.updatedAt).toBeDefined();

//       createdClinicId = response.body.id;
//     });

//     it('should return 400 for invalid clinic data', async () => {
//       const invalidClinicDto = {
//         name: '', // Empty name
//         address: 'Ala B, 2º andar',
//         city: 'São Paulo',
//         state: 'SP',
//         zipCode: '01234-567',
//         phone: '+55 11 8888-8888',
//         email: 'invalid-email', // Invalid email format
//         cnpj: '98.765.432/0001-10',
//       };

//       await request(app.getHttpServer())
//         .post('/organizations/clinics')
//         .send(invalidClinicDto)
//         .expect(400);
//     });

//     it('should return 400 for missing required fields', async () => {
//       const incompleteClinicDto = {
//         name: 'test-e2e-Clínica Incomplete',
//         // Missing required fields
//       };

//       await request(app.getHttpServer())
//         .post('/organizations/clinics')
//         .send(incompleteClinicDto)
//         .expect(400);
//     });

//     it('should return 400 for clinic name with only spaces', async () => {
//       const timestamp = Date.now();
//       const invalidClinicDto = {
//         name: '   ', // Only spaces
//         address: 'Ala B, 2º andar',
//         city: 'São Paulo',
//         state: 'SP',
//         zipCode: '01234-567',
//         phone: '+55 11 8888-8888',
//         email: `cardio-${timestamp}@test-e2e-clinic.com`,
//         cnpj: `98.765.432/0001-${String(timestamp).slice(-2)}`,
//       };

//       await request(app.getHttpServer())
//         .post('/organizations/clinics')
//         .send(invalidClinicDto)
//         .expect(400);
//     });
//   });

//   describe('/organizations/clinics/:id (GET)', () => {
//     beforeEach(async () => {
//       // Create a test clinic
//       const timestamp = Date.now();
//       const createClinicDto = {
//         name: 'test-e2e-Clínica Neurologia',
//         address: 'Sala 301, 3º andar',
//         city: 'Rio de Janeiro',
//         state: 'RJ',
//         zipCode: '22000-000',
//         phone: '+55 21 7777-7777',
//         email: `neuro-${timestamp}@test-e2e-clinic.com`,
//         cnpj: `11.222.333/0001-${String(timestamp).slice(-2)}`,
//       };

//       const response = await request(app.getHttpServer())
//         .post('/organizations/clinics')
//         .send(createClinicDto);

//       createdClinicId = response.body.id;
//     });

//     it('should return a specific clinic by ID', async () => {
//       const response = await request(app.getHttpServer())
//         .get(`/organizations/clinics/${createdClinicId}`)
//         .expect(200);

//       expect(response.body).toMatchObject({
//         id: createdClinicId,
//         name: 'test-e2e-Clínica Neurologia',
//         address: 'Sala 301, 3º andar',
//         city: 'Rio de Janeiro',
//         state: 'RJ',
//         zipCode: '22000-000',
//         phone: '+55 21 7777-7777',
//       });

//       expect(response.body.email).toContain('neuro-');
//       expect(response.body.email).toContain('@test-e2e-clinic.com');
//       expect(response.body.cnpj).toMatch(/11\.222\.333\/0001-\d{2}/);

//       expect(response.body.createdAt).toBeDefined();
//       expect(response.body.updatedAt).toBeDefined();
//     });

//     it('should return 404 for non-existent clinic', async () => {
//       await request(app.getHttpServer())
//         .get('/organizations/clinics/non-existent-id')
//         .expect(404);
//     });
//   });

//   describe('/organizations/clinics/:id (PATCH)', () => {
//     beforeEach(async () => {
//       // Create a test clinic
//       const timestamp = Date.now();
//       const createClinicDto = {
//         name: 'test-e2e-Clínica Dermatologia',
//         address: 'Consultório 205',
//         city: 'Belo Horizonte',
//         state: 'MG',
//         zipCode: '30000-000',
//         phone: '+55 31 6666-6666',
//         email: `derma-${timestamp}@test-e2e-clinic.com`,
//         cnpj: `55.666.777/0001-${String(timestamp).slice(-2)}`,
//       };

//       const response = await request(app.getHttpServer())
//         .post('/organizations/clinics')
//         .send(createClinicDto);

//       createdClinicId = response.body.id;
//     });

//     it('should update a clinic', async () => {
//       const updateClinicDto = {
//         name: 'test-e2e-Clínica Dermatologia Updated',
//         phone: '+55 31 5555-5555',
//         email: 'novo-derma@test-e2e-clinic.com',
//       };

//       const response = await request(app.getHttpServer())
//         .patch(`/organizations/clinics/${createdClinicId}`)
//         .send(updateClinicDto)
//         .expect(200);

//       expect(response.body).toMatchObject({
//         id: createdClinicId,
//         name: 'test-e2e-Clínica Dermatologia Updated',
//         phone: '+55 31 5555-5555',
//         email: 'novo-derma@test-e2e-clinic.com',
//         // Other fields should remain unchanged
//         address: 'Consultório 205',
//         city: 'Belo Horizonte',
//         state: 'MG',
//         zipCode: '30000-000',
//       });
//     });

//     it('should return 404 for non-existent clinic update', async () => {
//       const updateClinicDto = {
//         name: 'Updated Clinic Name',
//       };

//       await request(app.getHttpServer())
//         .patch('/organizations/clinics/non-existent-id')
//         .send(updateClinicDto)
//         .expect(404);
//     });

//     it('should return 400 for invalid update data', async () => {
//       const invalidUpdateDto = {
//         email: 'invalid-email-format', // Invalid email
//       };

//       await request(app.getHttpServer())
//         .patch(`/organizations/clinics/${createdClinicId}`)
//         .send(invalidUpdateDto)
//         .expect(400);
//     });

//     it('should return 400 for clinic name update with only spaces', async () => {
//       const invalidUpdateDto = {
//         name: '   ', // Only spaces
//       };

//       await request(app.getHttpServer())
//         .patch(`/organizations/clinics/${createdClinicId}`)
//         .send(invalidUpdateDto)
//         .expect(400);
//     });
//   });

//   describe('/organizations/clinics/:id (DELETE)', () => {
//     beforeEach(async () => {
//       // Create a test clinic
//       const timestamp = Date.now();
//       const createClinicDto = {
//         name: 'test-e2e-Clínica Oftalmologia',
//         address: 'Sala 102, 1º andar',
//         city: 'Porto Alegre',
//         state: 'RS',
//         zipCode: '90000-000',
//         phone: '+55 51 4444-4444',
//         email: `oftalmo-${timestamp}@test-e2e-clinic.com`,
//         cnpj: `99.888.777/0001-${String(timestamp).slice(-2)}`,
//       };

//       const response = await request(app.getHttpServer())
//         .post('/organizations/clinics')
//         .send(createClinicDto);

//       createdClinicId = response.body.id;
//     });

//     it('should delete a clinic', async () => {
//       await request(app.getHttpServer())
//         .delete(`/organizations/clinics/${createdClinicId}`)
//         .expect(204);

//       // Verify clinic was deleted
//       await request(app.getHttpServer())
//         .get(`/organizations/clinics/${createdClinicId}`)
//         .expect(404);
//     });

//     it('should return 404 for non-existent clinic deletion', async () => {
//       await request(app.getHttpServer())
//         .delete('/organizations/clinics/non-existent-id')
//         .expect(404);
//     });
//   });
// });
