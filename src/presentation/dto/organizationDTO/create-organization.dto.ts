// src/presentation/dto/hospitalDTO/create-hospital-with-clinic.dto.ts
import { IsString, IsEmail, ValidateNested } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class CreateHospitalDTO {
  @ApiProperty({ example: 'Hospital São Paulo' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'Rua das Flores, 123' })
  @IsString()
  address: string;

  @ApiProperty({ example: 'São Paulo' })
  @IsString()
  city: string;

  @ApiProperty({ example: 'SP' })
  @IsString()
  state: string;

  @ApiProperty({ example: '01234-567' })
  @IsString()
  zipCode: string;

  @ApiProperty({ example: '+55 11 9999-9999' })
  @IsString()
  phone: string;

  @ApiProperty({ example: 'contato@hospital.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: '12.345.678/0001-90' })
  @IsString()
  cnpj: string;
}

export class CreateClinicDTO {
  @ApiProperty({ example: 'Clínica Cardiologia' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'Ala B, 2º andar' })
  @IsString()
  address: string;

  @ApiProperty({ example: 'São Paulo' })
  @IsString()
  city: string;

  @ApiProperty({ example: 'SP' })
  @IsString()
  state: string;

  @ApiProperty({ example: '01234-567' })
  @IsString()
  zipCode: string;

  @ApiProperty({ example: '+55 11 8888-8888' })
  @IsString()
  phone: string;

  @ApiProperty({ example: 'cardio@hospital.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: '98.765.432/0001-10' })
  @IsString()
  cnpj: string;
}

export class CreateHospitalWithClinicDTO {
  @ApiProperty({ type: CreateHospitalDTO })
  @ValidateNested()
  @Type(() => CreateHospitalDTO)
  hospital: CreateHospitalDTO;

  @ApiProperty({ type: CreateClinicDTO })
  @ValidateNested()
  @Type(() => CreateClinicDTO)
  clinics: CreateClinicDTO[];
}
