import { applyDecorators } from "@nestjs/common";
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

export const ApiDoctorUnitOperations = {
    createDoctorUnit: () =>
        applyDecorators(
            ApiTags('doctor-units'),
            ApiOperation({
                summary: 'Associar médico a uma unidade',
                description:
                    'Cria a associação entre um médico e uma unidade, definindo preço da consulta e status.',
            }),
            ApiBody({
                description: 'Dados para associação do médico à unidade',
                schema: {
                    type: 'object',
                    required: ['doctorId', 'unitId', 'consultationPrice'],
                    properties: {
                        doctorId: {
                            type: 'string',
                            example: 'clxyz123456789abcdef',
                            description: 'ID do médico',
                        },
                        unitId: {
                            type: 'string',
                            example: 'clabc987654321fedcba',
                            description: 'ID da unidade (hospital ou clínica)',
                        },
                        consultationPrice: {
                            type: 'number',
                            example: 150,
                            description: 'Preço da consulta médica',
                        },
                        isPrimary: {
                            type: 'boolean',
                            example: true,
                            description: 'Indica se esta é a unidade principal do médico',
                        },
                        isActive: {
                            type: 'boolean',
                            example: true,
                            description: 'Status do médico nesta unidade',
                        },
                    },
                },
            }),
            ApiResponse({
                status: 201,
                description: 'Associação criada com sucesso',
                schema: {
                    type: 'object',
                    properties: {
                        id: {
                            type: 'string',
                            example: 'cmjiobll4000a34pwwa6xkybe',
                        },
                        doctorId: {
                            type: 'string',
                            example: 'cmjhja6fv0009n0pwqk73fd82',
                        },
                        unitId: {
                            type: 'string',
                            example: 'cmjhiz9ng0005i4pwx634gkuh',
                        },
                        consultationPrice: {
                            type: 'number',
                            example: 150,
                        },
                        isPrimary: {
                            type: 'boolean',
                            example: true,
                        },
                        isActive: {
                            type: 'boolean',
                            example: true,
                        },
                        createdAt: {
                            type: 'string',
                            format: 'date-time',
                            example: '2025-12-23T14:21:57.631Z',
                        },

                        unit: {
                            type: 'object',
                            properties: {
                                id: {
                                    type: 'string',
                                    example: 'cmjhiz9ng0005i4pwx634gkuh',
                                },
                                name: {
                                    type: 'string',
                                    example: 'Hospital São José',
                                },
                                type: {
                                    type: 'string',
                                    example: 'HOSPITAL',
                                },
                                city: {
                                    type: 'string',
                                    example: 'São Paulo',
                                },
                                state: {
                                    type: 'string',
                                    example: 'SP',
                                },
                            },
                        },
                    },
                },
            }),
            ApiResponse({
                status: 400,
                description: 'Erro de validação',
                schema: {
                    type: 'object',
                    properties: {
                        statusCode: { type: 'number', example: 400 },
                        message: {
                            type: 'string',
                            example: 'Preço da consulta é obrigatório',
                        },
                        errorCode: { type: 'string', example: 'VALIDATION_ERROR' },
                    },
                },
            }),
            ApiResponse({
                status: 404,
                description: 'Médico ou unidade não encontrados',
                schema: {
                    type: 'object',
                    properties: {
                        statusCode: { type: 'number', example: 404 },
                        message: {
                            type: 'string',
                            example: 'Unidade inválida ou inativa',
                        },
                        errorCode: { type: 'string', example: 'UNIT_INVALID' },
                    },
                },
            }),
        ),
};
