import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class UpdateDoctorDTO {
  @ApiProperty({
    description: 'Número do CRM do médico',
    example: '123456-SP',
    required: false,
  })
  @IsOptional()
  @IsString()
  crm?: string;

  @ApiProperty({
    description: 'Indica se o CRM está ativo',
    example: true,
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  crmState?: boolean;

  @ApiProperty({
    description: 'Status do médico',
    example: true,
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
