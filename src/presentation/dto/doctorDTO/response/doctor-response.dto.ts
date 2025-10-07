import { Clinic } from "src/infrastructure/database/models/clinic.models";
import { Hospital } from "src/infrastructure/database/models/hospital.models";
import { User } from "src/infrastructure/database/models/user.models";

export class DoctorResponseDTO {
  @ApiProperty({
    description: 'Crm único do usuário',
    example: '9898989898',
  })
  @Expose()
  crm: string;

  @ApiProperty({
    description: 'Crm ativo/inativo do usuário',
    example: true,
    default: true,
  })
  @Expose()
  crmState: Boolean;

  @ApiProperty({
    description: 'Preço da consulta medica',
    example: 'R$150,00',
  })
  @Expose()
  consultationPrice?: number;

  @ApiProperty({
    description: 'Status do perfil do usuário',
    example: true,
    default: true,
  })
  @Exclude()
  isActive: boolean;

  @ApiProperty({
    description: 'Data de criação do usuário',
    example: '2024-01-01T00:00:00.000Z',
  })
  @Expose()
  createdAt: string;

  @ApiProperty({
    description: 'Data da última atualização do usuário',
    example: '2024-01-01T00:00:00.000Z',
  })
  @Expose()
  updatedAt: string;

  // Relacionamentos

  user?: User;
  hospital?: Hospital;
  clinic?: Clinic;
}