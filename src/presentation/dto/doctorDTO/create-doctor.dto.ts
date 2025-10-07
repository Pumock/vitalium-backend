import { Clinic } from "src/infrastructure/database/models/clinic.models";
import { Hospital } from "src/infrastructure/database/models/hospital.models";
import { User } from "src/infrastructure/database/models/user.models";

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
  crmState: Boolean;

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

  // Relacionamentos

  user?: User;
  hospital?: Hospital;
  clinic?: Clinic;
}