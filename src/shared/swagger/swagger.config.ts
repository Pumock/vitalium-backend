import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export class SwaggerConfig {
  static setup(app: INestApplication): void {
    const config = new DocumentBuilder()
      .setTitle('Vitalium Backend API')
      .setDescription('API para sistema de gestão médica Vitalium')
      .setVersion('1.0.0')
      .addTag('users', 'Operações relacionadas aos usuários')
      .addTag('doctors', 'Operações relacionadas aos médicos')
      .addTag('organizations', 'Operações relacionadas aos médicos')
      .addTag('Health', 'Status da aplicação')
      .addBearerAuth(
        {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          name: 'JWT',
          description: 'Enter JWT token',
          in: 'header',
        },
        'JWT-auth',
      )
      .addServer('http://localhost:3000', 'Servidor de Desenvolvimento')
      .addServer('https://api.vitalium.com', 'Servidor de Produção')
      .setContact('Equipe Vitalium', 'https://vitalium.com', 'dev@vitalium.com')
      .setLicense('MIT', 'https://opensource.org/licenses/MIT')
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api/docs', app, document, {
      swaggerOptions: {
        persistAuthorization: true,
        displayRequestDuration: true,
        docExpansion: 'none',
        filter: true,
        showRequestHeaders: true,
        tryItOutEnabled: true,
      },
      customSiteTitle: 'Vitalium API Docs',
      customCss: `
        .swagger-ui .topbar { display: none; }
        .swagger-ui .info .title { color: #2d5aa0; }
        .swagger-ui .scheme-container { background: #f8f9fa; }
      `,
    });
  }
}
