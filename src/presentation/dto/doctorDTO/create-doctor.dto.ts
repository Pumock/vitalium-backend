import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';
import { User } from '../../../infrastructure/database/models/user.models';
import { Hospital } from '../../../infrastructure/database/models/hospital.models';
import { Clinic } from '../../../infrastructure/database/models/clinic.models';

export class CreateDoctorDTO {
  @ApiProperty({
    description: 'Crm único do usuário',
    example: '9898989898',
  })
  @IsString()
  crm: string;

  @ApiProperty({
    description: 'Crm ativo/inativo do usuário',
    example: true,
    default: true,
  })
  @IsBoolean()
  crmState: boolean;

  @ApiProperty({
    description: 'Preço da consulta medica',
    example: 'R$150,00',
  })
  @IsOptional()
  @IsNumber()
  consultationPrice?: number;

  @ApiProperty({
    description: 'Status do perfil do usuário',
    example: true,
    default: true,
  })
  @IsBoolean()
  isActive: boolean;

  @ApiProperty({
    description: 'ID do usuário a ser associado ao médico',
    example: 'user-uuid-123',
  })
  @IsString()
  userId: string;

  // Relacionamentos - devem ser fornecidos para criar o médico
  user?: User;
  hospital?: Hospital;
  clinic?: Clinic;
}
