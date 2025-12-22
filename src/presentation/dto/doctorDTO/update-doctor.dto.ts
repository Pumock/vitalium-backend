import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';
import { User } from '../../../infrastructure/database/models/core/user.models';
import { Hospital } from '../../../infrastructure/database/models/unit/unit.models';
import { Clinic } from '../../../infrastructure/database/models/clinic.models';

export class UpdateDoctorDTO {
  @ApiProperty({
    description: 'Número do CRM do médico (único no sistema)',
    example: '123456-SP',
    required: false,
  })
  @IsOptional()
  @IsString()
  crm?: string;

  @ApiProperty({
    description: 'Indica se o CRM do médico está ativo',
    example: true,
    default: true,
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  crmState?: boolean;

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
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  // Relacionamentos - podem ser atualizados
  user?: User;
  hospital?: Hospital;
  clinic?: Clinic;
}
