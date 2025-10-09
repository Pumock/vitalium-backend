import { applyDecorators } from '@nestjs/common';
import {
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiBody,
  ApiParam,
} from '@nestjs/swagger';

export const ApiDoctorOperations = {
  createDoctor: () =>
    applyDecorators(
      ApiTags('doctors'),
      ApiOperation({
        summary: 'Criar novo médico',
        description:
          'Cria um novo médico no sistema com as informações fornecidas',
      }),
      ApiBody({
        description: 'Dados para criação do médico',
        schema: {
          type: 'object',
          required: ['userId', 'specialty', 'crm', 'consultationPrice'],
          properties: {
            userId: {
              type: 'string',
              example: 'clxyz123456789',
              description: 'ID do usuário associado ao médico',
            },
            specialty: {
              type: 'string',
              example: 'Cardiologia',
              description: 'Especialidade médica',
            },
            crm: {
              type: 'string',
              example: '123456',
              description: 'Número do CRM do médico',
            },
            consultationPrice: {
              type: 'number',
              example: 150.0,
              description: 'Preço da consulta',
            },
            bio: {
              type: 'string',
              example:
                'Médico especialista em cardiologia com 10 anos de experiência',
              description: 'Biografia do médico (opcional)',
            },
          },
        },
      }),
      ApiResponse({
        status: 201,
        description: 'Médico criado com sucesso',
        schema: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              example: 'clxyz123456789',
              description: 'ID único do médico',
            },
            userId: {
              type: 'string',
              example: 'clxyz123456789',
              description: 'ID do usuário associado',
            },
            specialty: {
              type: 'string',
              example: 'Cardiologia',
              description: 'Especialidade médica',
            },
            crm: {
              type: 'string',
              example: '123456',
              description: 'Número do CRM',
            },
            consultationPrice: {
              type: 'number',
              example: 150.0,
              description: 'Preço da consulta',
            },
            bio: {
              type: 'string',
              example: 'Médico especialista em cardiologia',
              description: 'Biografia do médico',
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
              example: 'Erro de validação nos campos: userId, specialty',
            },
            errorCode: { type: 'string', example: 'VALIDATION_ERROR' },
          },
        },
      }),
      ApiResponse({
        status: 404,
        description: 'Usuário não encontrado',
        schema: {
          type: 'object',
          properties: {
            statusCode: { type: 'number', example: 404 },
            message: { type: 'string', example: 'Usuário não encontrado' },
            errorCode: { type: 'string', example: 'USER_NOT_FOUND' },
          },
        },
      }),
    ),

  findAllDoctors: () =>
    applyDecorators(
      ApiTags('doctors'),
      ApiOperation({
        summary: 'Listar todos os médicos',
        description:
          'Retorna uma lista de todos os médicos cadastrados no sistema',
      }),
      ApiResponse({
        status: 200,
        description: 'Lista de médicos retornada com sucesso',
        schema: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: {
                type: 'string',
                example: 'clxyz123456789',
                description: 'ID único do médico',
              },
              userId: {
                type: 'string',
                example: 'clxyz123456789',
                description: 'ID do usuário associado',
              },
              specialty: {
                type: 'string',
                example: 'Cardiologia',
                description: 'Especialidade médica',
              },
              crm: {
                type: 'string',
                example: '123456',
                description: 'Número do CRM',
              },
              consultationPrice: {
                type: 'number',
                example: 150.0,
                description: 'Preço da consulta',
              },
              bio: {
                type: 'string',
                example: 'Médico especialista em cardiologia',
                description: 'Biografia do médico',
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
        },
      }),
    ),

  findDoctorById: () =>
    applyDecorators(
      ApiTags('doctors'),
      ApiOperation({
        summary: 'Buscar médico por ID',
        description: 'Retorna os dados de um médico específico pelo seu ID',
      }),
      ApiParam({
        name: 'id',
        description: 'ID único do médico',
        example: 'clxyz123456789',
        type: 'string',
      }),
      ApiResponse({
        status: 200,
        description: 'Médico encontrado com sucesso',
        schema: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              example: 'clxyz123456789',
              description: 'ID único do médico',
            },
            userId: {
              type: 'string',
              example: 'clxyz123456789',
              description: 'ID do usuário associado',
            },
            specialty: {
              type: 'string',
              example: 'Cardiologia',
              description: 'Especialidade médica',
            },
            crm: {
              type: 'string',
              example: '123456',
              description: 'Número do CRM',
            },
            consultationPrice: {
              type: 'number',
              example: 150.0,
              description: 'Preço da consulta',
            },
            bio: {
              type: 'string',
              example: 'Médico especialista em cardiologia',
              description: 'Biografia do médico',
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
        description: 'Médico não encontrado',
        schema: {
          type: 'object',
          properties: {
            statusCode: { type: 'number', example: 404 },
            message: {
              type: 'string',
              example:
                'Nenhum médico foi encontrado com os critérios: ID: clxyz123456789',
            },
            errorCode: { type: 'string', example: 'DOCTOR_NOT_FOUND' },
          },
        },
      }),
    ),

  updateDoctor: () =>
    applyDecorators(
      ApiTags('doctors'),
      ApiOperation({
        summary: 'Atualizar médico',
        description: 'Atualiza os dados de um médico existente',
      }),
      ApiParam({
        name: 'id',
        description: 'ID único do médico',
        example: 'clxyz123456789',
        type: 'string',
      }),
      ApiBody({
        description: 'Dados para atualização do médico',
        schema: {
          type: 'object',
          properties: {
            specialty: {
              type: 'string',
              example: 'Cardiologia',
              description: 'Especialidade médica (opcional)',
            },
            crm: {
              type: 'string',
              example: '123456',
              description: 'Número do CRM (opcional)',
            },
            consultationPrice: {
              type: 'number',
              example: 200.0,
              description: 'Preço da consulta (opcional)',
            },
            bio: {
              type: 'string',
              example:
                'Médico especialista em cardiologia com 15 anos de experiência',
              description: 'Biografia do médico (opcional)',
            },
          },
        },
      }),
      ApiResponse({
        status: 200,
        description: 'Médico atualizado com sucesso',
        schema: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              example: 'clxyz123456789',
              description: 'ID único do médico',
            },
            userId: {
              type: 'string',
              example: 'clxyz123456789',
              description: 'ID do usuário associado',
            },
            specialty: {
              type: 'string',
              example: 'Cardiologia',
              description: 'Especialidade médica',
            },
            crm: {
              type: 'string',
              example: '123456',
              description: 'Número do CRM',
            },
            consultationPrice: {
              type: 'number',
              example: 200.0,
              description: 'Preço da consulta',
            },
            bio: {
              type: 'string',
              example:
                'Médico especialista em cardiologia com 15 anos de experiência',
              description: 'Biografia do médico',
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
              example: 'Erro de validação nos campos: consultationPrice',
            },
            errorCode: { type: 'string', example: 'VALIDATION_ERROR' },
          },
        },
      }),
      ApiResponse({
        status: 404,
        description: 'Médico não encontrado',
        schema: {
          type: 'object',
          properties: {
            statusCode: { type: 'number', example: 404 },
            message: {
              type: 'string',
              example:
                'Nenhum médico foi encontrado com os critérios: ID: clxyz123456789',
            },
            errorCode: { type: 'string', example: 'DOCTOR_NOT_FOUND' },
          },
        },
      }),
    ),

  deleteDoctor: () =>
    applyDecorators(
      ApiTags('doctors'),
      ApiOperation({
        summary: 'Excluir médico',
        description: 'Remove um médico do sistema',
      }),
      ApiParam({
        name: 'id',
        description: 'ID único do médico',
        example: 'clxyz123456789',
        type: 'string',
      }),
      ApiResponse({
        status: 204,
        description: 'Médico excluído com sucesso',
      }),
      ApiResponse({
        status: 404,
        description: 'Médico não encontrado',
        schema: {
          type: 'object',
          properties: {
            statusCode: { type: 'number', example: 404 },
            message: {
              type: 'string',
              example:
                'Nenhum médico foi encontrado com os critérios: ID: clxyz123456789',
            },
            errorCode: { type: 'string', example: 'DOCTOR_NOT_FOUND' },
          },
        },
      }),
    ),
};
