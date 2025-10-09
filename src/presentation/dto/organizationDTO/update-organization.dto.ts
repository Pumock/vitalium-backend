import { IsString, IsEmail, ValidateNested, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class UpdateHospitalDTO {
  @ApiProperty({ example: 'Hospital São Paulo', required: false })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({ example: 'Rua das Flores, 123', required: false })
  @IsOptional()
  @IsString()
  address?: string;

  @ApiProperty({ example: 'São Paulo', required: false })
  @IsOptional()
  @IsString()
  city?: string;

  @ApiProperty({ example: 'SP', required: false })
  @IsOptional()
  @IsString()
  state?: string;

  @ApiProperty({ example: '01234-567', required: false })
  @IsOptional()
  @IsString()
  zipCode?: string;

  @ApiProperty({ example: '+55 11 9999-9999', required: false })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiProperty({ example: 'contato@hospital.com', required: false })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiProperty({ example: '12.345.678/0001-90', required: false })
  @IsOptional()
  @IsString()
  cnpj?: string;
}

export class UpdateClinicDTO {
  @ApiProperty({ example: 'Clínica Cardiologia', required: false })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({ example: 'Ala B, 2º andar', required: false })
  @IsOptional()
  @IsString()
  address?: string;

  @ApiProperty({ example: 'São Paulo', required: false })
  @IsOptional()
  @IsString()
  city?: string;

  @ApiProperty({ example: 'SP', required: false })
  @IsOptional()
  @IsString()
  state?: string;

  @ApiProperty({ example: '01234-567', required: false })
  @IsOptional()
  @IsString()
  zipCode?: string;

  @ApiProperty({ example: '+55 11 8888-8888', required: false })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiProperty({ example: 'cardio@hospital.com', required: false })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiProperty({ example: '98.765.432/0001-10', required: false })
  @IsOptional()
  @IsString()
  cnpj?: string;
}

export class CreateHospitalWithClinicDTO {
  @ApiProperty({ type: UpdateHospitalDTO })
  @ValidateNested()
  @Type(() => UpdateHospitalDTO)
  hospital?: UpdateHospitalDTO;

  @ApiProperty({ type: UpdateClinicDTO })
  @ValidateNested()
  @Type(() => UpdateClinicDTO)
  clinics?: UpdateClinicDTO[];
}
