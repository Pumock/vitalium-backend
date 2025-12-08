import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';
import { User } from '../../../infrastructure/database/models/user.models';
import { Hospital } from '../../../infrastructure/database/models/hospital.models';
import { Clinic } from '../../../infrastructure/database/models/clinic.models';

export class CreateDoctorDTO {
  @ApiProperty({
    description: 'Número do CRM do médico (único no sistema)',
    example: '123456-SP',
    required: true,
  })
  @IsString()
  crm: string;

  @ApiProperty({
    description: 'Indica se o CRM do médico está ativo',
    example: true,
    default: true,
    required: true,
  })
  @IsBoolean()
  crmState: boolean;

  @ApiProperty({
    description: 'Preço da consulta médica em reais',
    example: 150.0,
    required: false,
    type: Number,
  })
  @IsOptional()
  @IsNumber()
  consultationPrice?: number;

  @ApiProperty({
    description: 'Status do perfil do médico (ativo/inativo)',
    example: true,
    default: true,
    required: true,
  })
  @IsBoolean()
  isActive: boolean;

  @ApiProperty({
    description: 'ID do usuário (com role DOCTOR) a ser associado ao médico',
    example: 'clxyz123456789abcdef',
    required: true,
  })
  @IsString()
  userId: string;

  // Relacionamentos - devem ser fornecidos para criar o médico
  user?: User;
  hospital?: Hospital;
  clinic?: Clinic;
}
