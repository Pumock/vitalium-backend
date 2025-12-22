import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsOptional } from 'class-validator';

export class UpdateDoctorUnitDTO {
    @ApiProperty({
        description: 'Preço da consulta médica',
        example: 180,
        required: false,
    })
    @IsOptional()
    @IsNumber()
    consultationPrice?: number;

    @ApiProperty({
        description: 'Esta unidade é a principal?',
        example: true,
        required: false,
    })
    @IsOptional()
    @IsBoolean()
    isPrimary?: boolean;

    @ApiProperty({
        description: 'Status do médico nesta unidade',
        example: true,
        required: false,
    })
    @IsOptional()
    @IsBoolean()
    isActive?: boolean;
}
