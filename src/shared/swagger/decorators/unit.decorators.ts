import { applyDecorators } from '@nestjs/common';
import {
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiBody,
  ApiParam,
} from '@nestjs/swagger';
import { UnitType } from '../../enums/unit.enum';

export const ApiUnitOperations = {
  // Hospital Operations
  createUnit: () =>
    applyDecorators(
      ApiTags('units'),
      ApiOperation({
        summary: 'Criar uma nova unidade',
        description:
          'Cria uma nova unidade',
      }),
      ApiBody({
        description: 'Dados para criação de unidade',
        schema: {
          type: 'object',
          required: [
            'name',
            'type',
            'address',
            'city',
            'state',
            'zipCode',
            'phone',
            'email',
            'cnpj',
          ],
          properties: {
            name: {
              type: 'string',
              example: 'Hospital São José',
              description: 'Nome do hospital',
            },
            type: {
              type: 'string',
              enum: Object.values(UnitType),
              example: UnitType.HOSPITAL,
              description: 'Tipo da unidade',
            },
            address: {
              type: 'string',
              example: 'Rua das Flores, 123',
              description: 'Endereço do hospital',
            },
            city: {
              type: 'string',
              example: 'São Paulo',
              description: 'Cidade do hospital',
            },
            state: {
              type: 'string',
              example: 'SP',
              description: 'Estado do hospital',
            },
            zipCode: {
              type: 'string',
              example: '01234567',
              description: 'CEP do hospital',
            },
            phone: {
              type: 'string',
              example: '1133334444',
              description: 'Telefone do hospital',
            },
            email: {
              type: 'string',
              format: 'email',
              example: 'contato@hospitalsaojose.com.br',
              description: 'Email do hospital',
            },
            cnpj: {
              type: 'string',
              example: '12345678000190',
              description: 'CNPJ do hospital',
            }

          },
        },
      }),
      ApiResponse({
        status: 201,
        description: 'Unidade criado com sucesso',
        schema: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              example: 'clxyz123456789',
              description: 'ID único do hospital',
            },
            name: {
              type: 'string',
              example: 'Hospital São José',
              description: 'Nome do hospital',
            },
            address: {
              type: 'string',
              example: 'Rua das Flores, 123',
              description: 'Endereço do hospital',
            },
            city: {
              type: 'string',
              example: 'São Paulo',
              description: 'Cidade do hospital',
            },
            state: {
              type: 'string',
              example: 'SP',
              description: 'Estado do hospital',
            },
            zipCode: {
              type: 'string',
              example: '01234567',
              description: 'CEP do hospital',
            },
            phone: {
              type: 'string',
              example: '1133334444',
              description: 'Telefone do hospital',
            },
            email: {
              type: 'string',
              example: 'contato@hospitalsaojose.com.br',
              description: 'Email do hospital',
            },
            cnpj: {
              type: 'string',
              example: '12345678000190',
              description: 'CNPJ do hospital',
            },
            description: {
              type: 'string',
              example: 'Hospital especializado em cardiologia e oncologia',
              description: 'Descrição do hospital',
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'Data de criação',
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
              description: 'Data de atualização',
            },
          },
        },
      }),
      ApiResponse({
        status: 400,
        description: 'Dados inválidos fornecidos',
        schema: {
          type: 'object',
          properties: {
            statusCode: { type: 'number', example: 400 },
            message: {
              type: 'string',
              example: 'Erro de validação nos campos: name, email, cnpj',
            },
            errorCode: { type: 'string', example: 'VALIDATION_ERROR' },
          },
        },
      }),
    ),

  findHospitalById: () =>
    applyDecorators(
      ApiTags('organizations'),
      ApiOperation({
        summary: 'Buscar hospital por ID',
        description: 'Retorna os dados de um hospital específico pelo seu ID',
      }),
      ApiParam({
        name: 'id',
        description: 'ID único do hospital',
        example: 'clxyz123456789',
        type: 'string',
      }),
      ApiResponse({
        status: 200,
        description: 'Hospital encontrado com sucesso',
        schema: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              example: 'clxyz123456789',
              description: 'ID único do hospital',
            },
            name: {
              type: 'string',
              example: 'Hospital São José',
              description: 'Nome do hospital',
            },
            address: {
              type: 'string',
              example: 'Rua das Flores, 123',
              description: 'Endereço do hospital',
            },
            city: {
              type: 'string',
              example: 'São Paulo',
              description: 'Cidade do hospital',
            },
            state: {
              type: 'string',
              example: 'SP',
              description: 'Estado do hospital',
            },
            zipCode: {
              type: 'string',
              example: '01234-567',
              description: 'CEP do hospital',
            },
            phone: {
              type: 'string',
              example: '+55 11 3333-4444',
              description: 'Telefone do hospital',
            },
            email: {
              type: 'string',
              example: 'contato@hospitalsaojose.com.br',
              description: 'Email do hospital',
            },
            cnpj: {
              type: 'string',
              example: '12345678000190',
              description: 'CNPJ do hospital',
            },
            description: {
              type: 'string',
              example: 'Hospital especializado em cardiologia e oncologia',
              description: 'Descrição do hospital',
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'Data de criação',
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
              description: 'Data de atualização',
            },
          },
        },
      }),
      ApiResponse({
        status: 404,
        description: 'Hospital não encontrado',
        schema: {
          type: 'object',
          properties: {
            statusCode: { type: 'number', example: 404 },
            message: {
              type: 'string',
              example:
                'Nenhum hospital foi encontrado com os critérios: ID: clxyz123456789',
            },
            errorCode: { type: 'string', example: 'HOSPITAL_NOT_FOUND' },
          },
        },
      }),
    ),

  updateHospital: () =>
    applyDecorators(
      ApiTags('organizations'),
      ApiOperation({
        summary: 'Atualizar hospital',
        description: 'Atualiza os dados de um hospital existente',
      }),
      ApiParam({
        name: 'id',
        description: 'ID único do hospital',
        example: 'clxyz123456789',
        type: 'string',
      }),
      ApiBody({
        description: 'Dados para atualização do hospital',
        schema: {
          type: 'object',
          properties: {
            name: {
              type: 'string',
              example: 'Hospital São José - Unidade Central',
              description: 'Nome do hospital (opcional)',
            },
            address: {
              type: 'string',
              example: 'Rua das Palmeiras, 456',
              description: 'Endereço do hospital (opcional)',
            },
            city: {
              type: 'string',
              example: 'São Paulo',
              description: 'Cidade do hospital (opcional)',
            },
            state: {
              type: 'string',
              example: 'SP',
              description: 'Estado do hospital (opcional)',
            },
            zipCode: {
              type: 'string',
              example: '01234-567',
              description: 'CEP do hospital (opcional)',
            },
            phone: {
              type: 'string',
              example: '1133335555',
              description: 'Telefone do hospital (opcional)',
            },
            email: {
              type: 'string',
              format: 'email',
              example: 'contato@hospitalsaojose.com.br',
              description: 'Email do hospital (opcional)',
            },
            description: {
              type: 'string',
              example:
                'Hospital especializado em cardiologia, oncologia e neurologia',
              description: 'Descrição do hospital (opcional)',
            },
          },
        },
      }),
      ApiResponse({
        status: 200,
        description: 'Hospital atualizado com sucesso',
        schema: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              example: 'clxyz123456789',
              description: 'ID único do hospital',
            },
            name: {
              type: 'string',
              example: 'Hospital São José - Unidade Central',
              description: 'Nome do hospital',
            },
            address: {
              type: 'string',
              example: 'Rua das Palmeiras, 456',
              description: 'Endereço do hospital',
            },
            city: {
              type: 'string',
              example: 'São Paulo',
              description: 'Cidade do hospital',
            },
            state: {
              type: 'string',
              example: 'SP',
              description: 'Estado do hospital',
            },
            zipCode: {
              type: 'string',
              example: '01234-567',
              description: 'CEP do hospital',
            },
            phone: {
              type: 'string',
              example: '+55 11 3333-5555',
              description: 'Telefone do hospital',
            },
            email: {
              type: 'string',
              example: 'contato@hospitalsaojose.com.br',
              description: 'Email do hospital',
            },
            cnpj: {
              type: 'string',
              example: '12.345.678/0001-90',
              description: 'CNPJ do hospital',
            },
            description: {
              type: 'string',
              example:
                'Hospital especializado em cardiologia, oncologia e neurologia',
              description: 'Descrição do hospital',
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'Data de criação',
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
              description: 'Data de atualização',
            },
          },
        },
      }),
      ApiResponse({
        status: 400,
        description: 'Dados inválidos fornecidos',
        schema: {
          type: 'object',
          properties: {
            statusCode: { type: 'number', example: 400 },
            message: {
              type: 'string',
              example: 'Erro de validação nos campos: email',
            },
            errorCode: { type: 'string', example: 'VALIDATION_ERROR' },
          },
        },
      }),
      ApiResponse({
        status: 404,
        description: 'Hospital não encontrado',
        schema: {
          type: 'object',
          properties: {
            statusCode: { type: 'number', example: 404 },
            message: {
              type: 'string',
              example:
                'Nenhum hospital foi encontrado com os critérios: ID: clxyz123456789',
            },
            errorCode: { type: 'string', example: 'HOSPITAL_NOT_FOUND' },
          },
        },
      }),
    ),

  deleteHospital: () =>
    applyDecorators(
      ApiTags('organizations'),
      ApiOperation({
        summary: 'Excluir hospital',
        description: 'Remove um hospital do sistema',
      }),
      ApiParam({
        name: 'id',
        description: 'ID único do hospital',
        example: 'clxyz123456789',
        type: 'string',
      }),
      ApiResponse({
        status: 204,
        description: 'Hospital excluído com sucesso',
      }),
      ApiResponse({
        status: 404,
        description: 'Hospital não encontrado',
        schema: {
          type: 'object',
          properties: {
            statusCode: { type: 'number', example: 404 },
            message: {
              type: 'string',
              example:
                'Nenhum hospital foi encontrado com os critérios: ID: clxyz123456789',
            },
            errorCode: { type: 'string', example: 'HOSPITAL_NOT_FOUND' },
          },
        },
      }),
    ),

  // Clinic Operations
  createClinic: () =>
    applyDecorators(
      ApiTags('organizations'),
      ApiOperation({
        summary: 'Criar nova clínica',
        description:
          'Cria uma nova clínica no sistema com as informações fornecidas',
      }),
      ApiBody({
        description: 'Dados para criação da clínica',
        schema: {
          type: 'object',
          required: [
            'name',
            'address',
            'city',
            'state',
            'zipCode',
            'phone',
            'email',
            'cnpj',
          ],
          properties: {
            name: {
              type: 'string',
              example: 'Clínica Médica Central',
              description: 'Nome da clínica',
            },
            address: {
              type: 'string',
              example: 'Av. Paulista, 1000',
              description: 'Endereço da clínica',
            },
            city: {
              type: 'string',
              example: 'São Paulo',
              description: 'Cidade da clínica',
            },
            state: {
              type: 'string',
              example: 'SP',
              description: 'Estado da clínica',
            },
            zipCode: {
              type: 'string',
              example: '01310-100',
              description: 'CEP da clínica',
            },
            phone: {
              type: 'string',
              example: '1122223333',
              description: 'Telefone da clínica',
            },
            email: {
              type: 'string',
              format: 'email',
              example: 'contato@clinicacentral.com.br',
              description: 'Email da clínica',
            },
            cnpj: {
              type: 'string',
              example: '98765432000110',
              description: 'CNPJ da clínica',
            },
            description: {
              type: 'string',
              example: 'Clínica especializada em consultas médicas gerais',
              description: 'Descrição da clínica (opcional)',
            },
          },
        },
      }),
      ApiResponse({
        status: 201,
        description: 'Clínica criada com sucesso',
        schema: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              example: 'clxyz987654321',
              description: 'ID único da clínica',
            },
            name: {
              type: 'string',
              example: 'Clínica Médica Central',
              description: 'Nome da clínica',
            },
            address: {
              type: 'string',
              example: 'Av. Paulista, 1000',
              description: 'Endereço da clínica',
            },
            city: {
              type: 'string',
              example: 'São Paulo',
              description: 'Cidade da clínica',
            },
            state: {
              type: 'string',
              example: 'SP',
              description: 'Estado da clínica',
            },
            zipCode: {
              type: 'string',
              example: '01310100',
              description: 'CEP da clínica',
            },
            phone: {
              type: 'string',
              example: '1122223333',
              description: 'Telefone da clínica',
            },
            email: {
              type: 'string',
              example: 'contato@clinicacentral.com.br',
              description: 'Email da clínica',
            },
            cnpj: {
              type: 'string',
              example: '987654320001-10',
              description: 'CNPJ da clínica',
            },
            description: {
              type: 'string',
              example: 'Clínica especializada em consultas médicas gerais',
              description: 'Descrição da clínica',
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'Data de criação',
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
              description: 'Data de atualização',
            },
          },
        },
      }),
      ApiResponse({
        status: 400,
        description: 'Dados inválidos fornecidos',
        schema: {
          type: 'object',
          properties: {
            statusCode: { type: 'number', example: 400 },
            message: {
              type: 'string',
              example: 'Erro de validação nos campos: name, email, cnpj',
            },
            errorCode: { type: 'string', example: 'VALIDATION_ERROR' },
          },
        },
      }),
    ),

  findClinicById: () =>
    applyDecorators(
      ApiTags('organizations'),
      ApiOperation({
        summary: 'Buscar clínica por ID',
        description: 'Retorna os dados de uma clínica específica pelo seu ID',
      }),
      ApiParam({
        name: 'id',
        description: 'ID único da clínica',
        example: 'clxyz987654321',
        type: 'string',
      }),
      ApiResponse({
        status: 200,
        description: 'Clínica encontrada com sucesso',
        schema: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              example: 'clxyz987654321',
              description: 'ID único da clínica',
            },
            name: {
              type: 'string',
              example: 'Clínica Médica Central',
              description: 'Nome da clínica',
            },
            address: {
              type: 'string',
              example: 'Av. Paulista, 1000',
              description: 'Endereço da clínica',
            },
            city: {
              type: 'string',
              example: 'São Paulo',
              description: 'Cidade da clínica',
            },
            state: {
              type: 'string',
              example: 'SP',
              description: 'Estado da clínica',
            },
            zipCode: {
              type: 'string',
              example: '01310-100',
              description: 'CEP da clínica',
            },
            phone: {
              type: 'string',
              example: '+55 11 2222-3333',
              description: 'Telefone da clínica',
            },
            email: {
              type: 'string',
              example: 'contato@clinicacentral.com.br',
              description: 'Email da clínica',
            },
            cnpj: {
              type: 'string',
              example: '98.765.432/0001-10',
              description: 'CNPJ da clínica',
            },
            description: {
              type: 'string',
              example: 'Clínica especializada em consultas médicas gerais',
              description: 'Descrição da clínica',
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'Data de criação',
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
              description: 'Data de atualização',
            },
          },
        },
      }),
      ApiResponse({
        status: 404,
        description: 'Clínica não encontrada',
        schema: {
          type: 'object',
          properties: {
            statusCode: { type: 'number', example: 404 },
            message: {
              type: 'string',
              example:
                'Nenhuma clínica foi encontrada com os critérios: ID: clxyz987654321',
            },
            errorCode: { type: 'string', example: 'CLINIC_NOT_FOUND' },
          },
        },
      }),
    ),

  updateClinic: () =>
    applyDecorators(
      ApiTags('organizations'),
      ApiOperation({
        summary: 'Atualizar clínica',
        description: 'Atualiza os dados de uma clínica existente',
      }),
      ApiParam({
        name: 'id',
        description: 'ID único da clínica',
        example: 'clxyz987654321',
        type: 'string',
      }),
      ApiBody({
        description: 'Dados para atualização da clínica',
        schema: {
          type: 'object',
          properties: {
            name: {
              type: 'string',
              example: 'Clínica Médica Central - Unidade Paulista',
              description: 'Nome da clínica (opcional)',
            },
            address: {
              type: 'string',
              example: 'Av. Paulista, 2000',
              description: 'Endereço da clínica (opcional)',
            },
            city: {
              type: 'string',
              example: 'São Paulo',
              description: 'Cidade da clínica (opcional)',
            },
            state: {
              type: 'string',
              example: 'SP',
              description: 'Estado da clínica (opcional)',
            },
            zipCode: {
              type: 'string',
              example: '01310-200',
              description: 'CEP da clínica (opcional)',
            },
            phone: {
              type: 'string',
              example: '+55 11 2222-4444',
              description: 'Telefone da clínica (opcional)',
            },
            email: {
              type: 'string',
              format: 'email',
              example: 'contato@clinicacentral.com.br',
              description: 'Email da clínica (opcional)',
            },
            description: {
              type: 'string',
              example:
                'Clínica especializada em consultas médicas gerais e especialidades',
              description: 'Descrição da clínica (opcional)',
            },
          },
        },
      }),
      ApiResponse({
        status: 200,
        description: 'Clínica atualizada com sucesso',
        schema: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              example: 'clxyz987654321',
              description: 'ID único da clínica',
            },
            name: {
              type: 'string',
              example: 'Clínica Médica Central - Unidade Paulista',
              description: 'Nome da clínica',
            },
            address: {
              type: 'string',
              example: 'Av. Paulista, 2000',
              description: 'Endereço da clínica',
            },
            city: {
              type: 'string',
              example: 'São Paulo',
              description: 'Cidade da clínica',
            },
            state: {
              type: 'string',
              example: 'SP',
              description: 'Estado da clínica',
            },
            zipCode: {
              type: 'string',
              example: '01310-200',
              description: 'CEP da clínica',
            },
            phone: {
              type: 'string',
              example: '+55 11 2222-4444',
              description: 'Telefone da clínica',
            },
            email: {
              type: 'string',
              example: 'contato@clinicacentral.com.br',
              description: 'Email da clínica',
            },
            cnpj: {
              type: 'string',
              example: '98.765.432/0001-10',
              description: 'CNPJ da clínica',
            },
            description: {
              type: 'string',
              example:
                'Clínica especializada em consultas médicas gerais e especialidades',
              description: 'Descrição da clínica',
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'Data de criação',
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
              description: 'Data de atualização',
            },
          },
        },
      }),
      ApiResponse({
        status: 400,
        description: 'Dados inválidos fornecidos',
        schema: {
          type: 'object',
          properties: {
            statusCode: { type: 'number', example: 400 },
            message: {
              type: 'string',
              example: 'Erro de validação nos campos: email',
            },
            errorCode: { type: 'string', example: 'VALIDATION_ERROR' },
          },
        },
      }),
      ApiResponse({
        status: 404,
        description: 'Clínica não encontrada',
        schema: {
          type: 'object',
          properties: {
            statusCode: { type: 'number', example: 404 },
            message: {
              type: 'string',
              example:
                'Nenhuma clínica foi encontrada com os critérios: ID: clxyz987654321',
            },
            errorCode: { type: 'string', example: 'CLINIC_NOT_FOUND' },
          },
        },
      }),
    ),

  deleteClinic: () =>
    applyDecorators(
      ApiTags('organizations'),
      ApiOperation({
        summary: 'Excluir clínica',
        description: 'Remove uma clínica do sistema',
      }),
      ApiParam({
        name: 'id',
        description: 'ID único da clínica',
        example: 'clxyz987654321',
        type: 'string',
      }),
      ApiResponse({
        status: 204,
        description: 'Clínica excluída com sucesso',
      }),
      ApiResponse({
        status: 404,
        description: 'Clínica não encontrada',
        schema: {
          type: 'object',
          properties: {
            statusCode: { type: 'number', example: 404 },
            message: {
              type: 'string',
              example:
                'Nenhuma clínica foi encontrada com os critérios: ID: clxyz987654321',
            },
            errorCode: { type: 'string', example: 'CLINIC_NOT_FOUND' },
          },
        },
      }),
    ),

  // Organization Operations (Hospital + Clinic)
  createOrganization: () =>
    applyDecorators(
      ApiTags('organizations'),
      ApiOperation({
        summary: 'Criar organização completa',
        description:
          'Cria uma organização completa com hospital e clínicas associadas',
      }),
      ApiBody({
        description: 'Dados para criação da organização',
        schema: {
          type: 'object',
          required: ['hospital', 'clinics'],
          properties: {
            hospital: {
              type: 'object',
              required: [
                'name',
                'address',
                'city',
                'state',
                'zipCode',
                'phone',
                'email',
                'cnpj',
              ],
              properties: {
                name: {
                  type: 'string',
                  example: 'Hospital Central',
                  description: 'Nome do hospital',
                },
                address: {
                  type: 'string',
                  example: 'Rua Principal, 500',
                  description: 'Endereço do hospital',
                },
                city: {
                  type: 'string',
                  example: 'São Paulo',
                  description: 'Cidade do hospital',
                },
                state: {
                  type: 'string',
                  example: 'SP',
                  description: 'Estado do hospital',
                },
                zipCode: {
                  type: 'string',
                  example: '01000-000',
                  description: 'CEP do hospital',
                },
                phone: {
                  type: 'string',
                  example: '+55 11 1111-2222',
                  description: 'Telefone do hospital',
                },
                email: {
                  type: 'string',
                  format: 'email',
                  example: 'contato@hospitalcentral.com.br',
                  description: 'Email do hospital',
                },
                cnpj: {
                  type: 'string',
                  example: '11.222.333/0001-44',
                  description: 'CNPJ do hospital',
                },
                description: {
                  type: 'string',
                  example: 'Hospital de alta complexidade',
                  description: 'Descrição do hospital (opcional)',
                },
              },
            },
            clinics: {
              type: 'array',
              items: {
                type: 'object',
                required: [
                  'name',
                  'address',
                  'city',
                  'state',
                  'zipCode',
                  'phone',
                  'email',
                  'cnpj',
                ],
                properties: {
                  name: {
                    type: 'string',
                    example: 'Clínica Anexa',
                    description: 'Nome da clínica',
                  },
                  address: {
                    type: 'string',
                    example: 'Rua Secundária, 100',
                    description: 'Endereço da clínica',
                  },
                  city: {
                    type: 'string',
                    example: 'São Paulo',
                    description: 'Cidade da clínica',
                  },
                  state: {
                    type: 'string',
                    example: 'SP',
                    description: 'Estado da clínica',
                  },
                  zipCode: {
                    type: 'string',
                    example: '01000-100',
                    description: 'CEP da clínica',
                  },
                  phone: {
                    type: 'string',
                    example: '+55 11 1111-3333',
                    description: 'Telefone da clínica',
                  },
                  email: {
                    type: 'string',
                    format: 'email',
                    example: 'clinica@hospitalcentral.com.br',
                    description: 'Email da clínica',
                  },
                  cnpj: {
                    type: 'string',
                    example: '11.222.333/0002-44',
                    description: 'CNPJ da clínica',
                  },
                  description: {
                    type: 'string',
                    example: 'Clínica de consultas ambulatoriais',
                    description: 'Descrição da clínica (opcional)',
                  },
                },
              },
              description: 'Lista de clínicas da organização',
            },
          },
        },
      }),
      ApiResponse({
        status: 201,
        description: 'Organização criada com sucesso',
        schema: {
          type: 'object',
          properties: {
            hospital: {
              type: 'object',
              description: 'Dados do hospital criado',
            },
            clinics: {
              type: 'array',
              description: 'Lista das clínicas criadas',
            },
          },
        },
      }),
      ApiResponse({
        status: 400,
        description: 'Dados inválidos fornecidos',
        schema: {
          type: 'object',
          properties: {
            statusCode: { type: 'number', example: 400 },
            message: {
              type: 'string',
              example: 'Erro de validação nos dados da organização',
            },
            errorCode: { type: 'string', example: 'VALIDATION_ERROR' },
          },
        },
      }),
    ),
};
