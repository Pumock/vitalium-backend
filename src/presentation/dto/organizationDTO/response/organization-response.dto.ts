import { Type, Expose } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ResponseClinicDTO {
  @ApiProperty({
    description: 'ID único da clínica',
    example: 'cm2def456ghi789abc123',
  })
  @Expose()
  id: string;

  @ApiProperty({
    description: 'Nome da clínica',
    example: 'Clínica de Cardiologia',
  })
  @Expose()
  name: string;

  @ApiProperty({
    description: 'Endereço da clínica',
    example: 'Ala B, 3º andar',
  })
  @Expose()
  address: string;

  @ApiProperty({
    description: 'Cidade da clínica',
    example: 'São Paulo',
  })
  @Expose()
  city: string;

  @ApiProperty({
    description: 'Estado da clínica',
    example: 'SP',
  })
  @Expose()
  state: string;

  @ApiProperty({
    description: 'CEP da clínica',
    example: '05652-900',
  })
  @Expose()
  zipCode: string;

  @ApiProperty({
    description: 'Telefone da clínica',
    example: '+55 11 2151-1234',
  })
  @Expose()
  phone: string;

  @ApiProperty({
    description: 'Email da clínica',
    example: 'cardio@einstein.br',
  })
  @Expose()
  email: string;

  @ApiProperty({
    description: 'CNPJ da clínica',
    example: '98.765.432/0001-10',
  })
  @Expose()
  cnpj: string;

  @ApiProperty({
    description: 'ID do hospital ao qual a clínica pertence',
    example: 'cm2abc123def456ghi789',
  })
  @Expose()
  hospitalId: string;

  @ApiProperty({
    description: 'Status ativo da clínica',
    example: true,
  })
  @Expose()
  isActive: boolean;

  @ApiProperty({
    description: 'Data de criação da clínica',
    example: '2024-01-01T00:00:00.000Z',
  })
  @Expose()
  createdAt: Date;

  @ApiProperty({
    description: 'Data de atualização da clínica',
    example: '2024-01-01T00:00:00.000Z',
  })
  @Expose()
  updatedAt: Date;
}

// Classes de resposta individuais
export class ResponseHospitalDTO {
  @ApiProperty({
    description: 'ID único do hospital',
    example: 'cm2abc123def456ghi789',
  })
  @Expose()
  id: string;

  @ApiProperty({
    description: 'Nome do hospital',
    example: 'Hospital Einstein',
  })
  @Expose()
  name: string;

  @ApiProperty({
    description: 'Endereço do hospital',
    example: 'Av. Albert Einstein, 627',
  })
  @Expose()
  address: string;

  @ApiProperty({
    description: 'Cidade do hospital',
    example: 'São Paulo',
  })
  @Expose()
  city: string;

  @ApiProperty({
    description: 'Estado do hospital',
    example: 'SP',
  })
  @Expose()
  state: string;

  @ApiProperty({
    description: 'CEP do hospital',
    example: '05652-900',
  })
  @Expose()
  zipCode: string;

  @ApiProperty({
    description: 'Telefone do hospital',
    example: '+55 11 2151-1233',
  })
  @Expose()
  phone: string;

  @ApiProperty({
    description: 'Email do hospital',
    example: 'contato@einstein.br',
  })
  @Expose()
  email: string;

  @ApiProperty({
    description: 'CNPJ do hospital',
    example: '12.345.678/0001-90',
  })
  @Expose()
  cnpj: string;

  @ApiProperty({
    description: 'Status ativo do hospital',
    example: true,
  })
  @Expose()
  isActive: boolean;

  @ApiProperty({
    description: 'Data de criação do hospital',
    example: '2024-01-01T00:00:00.000Z',
  })
  @Expose()
  createdAt: Date;

  @ApiProperty({
    description: 'Data de atualização do hospital',
    example: '2024-01-01T00:00:00.000Z',
  })
  @Expose()
  updatedAt: Date;

  @ApiProperty({
    description: 'Clínicas vinculadas ao hospital',
    type: [ResponseClinicDTO],
    isArray: true,
  })
  @ValidateNested({ each: true }) // each: true para arrays
  @Type(() => ResponseClinicDTO)
  @Expose()
  clinics: ResponseClinicDTO[];
}

// Classe auxiliar para a estrutura hospital com clínicas
export class OrganizationHospitalDataDTO {
  @ApiProperty({
    description: 'Dados do hospital com clínicas vinculadas',
    type: ResponseHospitalDTO,
  })
  @ValidateNested()
  @Type(() => ResponseHospitalDTO)
  @Expose()
  hospital: ResponseHospitalDTO;
}

export class ResponseOrganizationDTO {
  @ApiProperty({
    description: 'Dados da organização com hospital e clínicas',
    type: OrganizationHospitalDataDTO,
  })
  @ValidateNested()
  @Type(() => OrganizationHospitalDataDTO)
  @Expose()
  organization: OrganizationHospitalDataDTO;
}
