import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../../../infrastructure/database/models/user.models';
import { DoctorUnit } from '../../../../infrastructure/database/models/doctor-unit.models';

export class DoctorResponseDTO {
  @ApiProperty({
    description: 'ID único do médico',
    example: 'clxyz123456789abcdef',
  })
  @Expose()
  id: string;

  @ApiProperty({
    description: 'Número do CRM do médico (único no sistema)',
    example: '123456-SP',
  })
  @Expose()
  crm: string;

  @ApiProperty({
    description: 'Indica se o CRM do médico está ativo',
    example: true,
    default: true,
  })
  @Expose()
  crmState: boolean;

  @ApiProperty({
    description: 'Preço da consulta médica em reais',
    example: 150.0,
    type: Number,
  })
  @Expose()
  consultationPrice?: number;

  @ApiProperty({
    description: 'Status do perfil do médico (ativo/inativo)',
    example: true,
    default: true,
  })
  @Expose()
  isActive: boolean;

  @ApiProperty({
    description: 'Data de criação do registro',
    example: '2025-01-01T00:00:00.000Z',
  })
  @Expose()
  createdAt: string;

  @ApiProperty({
    description: 'Data da última atualização do registro',
    example: '2025-01-01T00:00:00.000Z',
  })
  @Expose()
  updatedAt: string;

  // Relacionamentos
  @ApiProperty({
    description: 'Usuário associado ao médico',
  })
  @Expose()
  user?: User;

  @Expose()
  units?: DoctorUnit[];


}
