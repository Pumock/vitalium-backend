import { IsString, IsEmail, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UnitType } from '../../../shared/enums/unit.enum';

export class CreateUnitDTO {
  @ApiProperty({ example: 'Hospital São Paulo' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'HOSPITAL' })
  @IsEnum(UnitType)
  type: UnitType;

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