import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateDoctorUnitDTO {

    @ApiProperty({
        description: 'ID do médico',
        example: 'clxyz123456789abcdef',
    })
    @IsString()
    doctorId: string;

    @ApiProperty({
        description: 'ID da unidade',
        example: 'clabc987654321fedcba',
    })
    @IsString()
    unitId: string;

    @ApiProperty({
        description: 'Preço da consulta médica em reais',
        example: 150.0,
        required: false,
    })
    @IsOptional()
    @IsNumber()
    consultationPrice?: number;

    @ApiProperty({
        description: 'Esta é a unidade principal do médico?',
        example: true,
        default: false,
        required: false,
    })
    @IsOptional()
    @IsBoolean()
    isPrimary?: boolean;

    @ApiProperty({
        description: 'Status do médico nesta unidade',
        example: true,
        default: true,
        required: false,
    })
    @IsOptional()
    @IsBoolean()
    isActive?: boolean;
}
