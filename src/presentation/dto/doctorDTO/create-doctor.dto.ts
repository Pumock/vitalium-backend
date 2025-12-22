import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsString } from 'class-validator';

export class CreateDoctorDTO {
  @ApiProperty({
    description: 'Número do CRM do médico',
    example: '123456-SP',
  })
  @IsString()
  crm: string;

  @ApiProperty({
    description: 'Indica se o CRM está ativo',
    example: true,
    default: true,
  })
  @IsBoolean()
  crmState: boolean;

  @ApiProperty({
    description: 'Status do médico',
    example: true,
    default: true,
  })
  @IsBoolean()
  isActive: boolean;

  @ApiProperty({
    description: 'ID do usuário associado (role DOCTOR)',
    example: 'clxyz123456789abcdef',
  })
  @IsString()
  userId: string;
}
