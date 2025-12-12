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
          'Cria um novo médico no sistema com as informações fornecidas. O usuário associado deve ter role DOCTOR.',
      }),
      ApiBody({
        description: 'Dados para criação do médico',
        schema: {
          type: 'object',
          required: ['userId', 'crm', 'crmState', 'isActive'],
          properties: {
            userId: {
              type: 'string',
              example: 'clxyz123456789abcdef',
              description:
                'ID do usuário (com role DOCTOR) a ser associado ao médico',
            },
            crm: {
              type: 'string',
              example: '123456-SP',
              description: 'Número do CRM do médico (único no sistema)',
            },
            crmState: {
              type: 'boolean',
              example: true,
              description: 'Indica se o CRM do médico está ativo',
            },
            consultationPrice: {
              type: 'number',
              example: 150.0,
              description: 'Preço da consulta médica em reais (opcional)',
            },
            isActive: {
              type: 'boolean',
              example: true,
              description: 'Status do perfil do médico (ativo/inativo)',
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
              example: 'clxyz123456789abcdef',
              description: 'ID único do médico',
            },
            crm: {
              type: 'string',
              example: '123456-SP',
              description: 'Número do CRM',
            },
            crmState: {
              type: 'boolean',
              example: true,
              description: 'Status do CRM',
            },
            consultationPrice: {
              type: 'number',
              example: 150.0,
              description: 'Preço da consulta',
            },
            isActive: {
              type: 'boolean',
              example: true,
              description: 'Status do perfil',
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
              example: 'Erro de validação nos campos: userId, crm',
            },
            errorCode: { type: 'string', example: 'VALIDATION_ERROR' },
          },
        },
      }),
      ApiResponse({
        status: 404,
        description: 'Usuário não encontrado ou não possui role DOCTOR',
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
                example: 'clxyz123456789abcdef',
                description: 'ID único do médico',
              },
              crm: {
                type: 'string',
                example: '123456-SP',
                description: 'Número do CRM',
              },
              crmState: {
                type: 'boolean',
                example: true,
                description: 'Status do CRM',
              },
              consultationPrice: {
                type: 'number',
                example: 150.0,
                description: 'Preço da consulta',
              },
              isActive: {
                type: 'boolean',
                example: true,
                description: 'Status do perfil',
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
        example: 'clxyz123456789abcdef',
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
              example: 'clxyz123456789abcdef',
              description: 'ID único do médico',
            },
            crm: {
              type: 'string',
              example: '123456-SP',
              description: 'Número do CRM',
            },
            crmState: {
              type: 'boolean',
              example: true,
              description: 'Status do CRM',
            },
            consultationPrice: {
              type: 'number',
              example: 150.0,
              description: 'Preço da consulta',
            },
            isActive: {
              type: 'boolean',
              example: true,
              description: 'Status do perfil',
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
                'Nenhum médico foi encontrado com os critérios: ID: clxyz123456789abcdef',
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
        example: 'clxyz123456789abcdef',
        type: 'string',
      }),
      ApiBody({
        description: 'Dados para atualização do médico (todos opcionais)',
        schema: {
          type: 'object',
          properties: {
            crm: {
              type: 'string',
              example: '654321-RJ',
              description: 'Número do CRM do médico (opcional)',
            },
            crmState: {
              type: 'boolean',
              example: true,
              description: 'Status do CRM (opcional)',
            },
            consultationPrice: {
              type: 'number',
              example: 200.0,
              description: 'Preço da consulta médica em reais (opcional)',
            },
            isActive: {
              type: 'boolean',
              example: true,
              description: 'Status do perfil do médico (opcional)',
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
              example: 'clxyz123456789abcdef',
              description: 'ID único do médico',
            },
            crm: {
              type: 'string',
              example: '654321-RJ',
              description: 'Número do CRM',
            },
            crmState: {
              type: 'boolean',
              example: true,
              description: 'Status do CRM',
            },
            consultationPrice: {
              type: 'number',
              example: 200.0,
              description: 'Preço da consulta',
            },
            isActive: {
              type: 'boolean',
              example: true,
              description: 'Status do perfil',
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
                'Nenhum médico foi encontrado com os critérios: ID: clxyz123456789abcdef',
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
        description: 'Remove um médico do sistema (soft delete)',
      }),
      ApiParam({
        name: 'id',
        description: 'ID único do médico',
        example: 'clxyz123456789abcdef',
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
                'Nenhum médico foi encontrado com os critérios: ID: clxyz123456789abcdef',
            },
            errorCode: { type: 'string', example: 'DOCTOR_NOT_FOUND' },
          },
        },
      }),
    ),
};
