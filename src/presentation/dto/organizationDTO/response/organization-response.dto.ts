import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ResponseClinicDTO {
  @ApiProperty({
    description: 'ID único da clínica',
    example: 'cm2def456ghi789abc123',
  })
  id: string;

  @ApiProperty({
    description: 'Nome da clínica',
    example: 'Clínica de Cardiologia',
  })
  name: string;

  @ApiProperty({
    description: 'Endereço da clínica',
    example: 'Ala B, 3º andar',
  })
  address: string;

  @ApiProperty({
    description: 'Cidade da clínica',
    example: 'São Paulo',
  })
  city: string;

  @ApiProperty({
    description: 'Estado da clínica',
    example: 'SP',
  })
  state: string;

  @ApiProperty({
    description: 'CEP da clínica',
    example: '05652-900',
  })
  zipCode: string;

  @ApiProperty({
    description: 'Telefone da clínica',
    example: '+55 11 2151-1234',
  })
  phone: string;

  @ApiProperty({
    description: 'Email da clínica',
    example: 'cardio@einstein.br',
  })
  email: string;

  @ApiProperty({
    description: 'ID do hospital ao qual a clínica pertence',
    example: 'cm2abc123def456ghi789',
  })
  hospitalId: string;

  @ApiProperty({
    description: 'Status ativo da clínica',
    example: true,
  })
  isActive: boolean;
}

// Classes de resposta individuais
export class ResponseHospitalDTO {
  @ApiProperty({
    description: 'ID único do hospital',
    example: 'cm2abc123def456ghi789',
  })
  id: string;

  @ApiProperty({
    description: 'Nome do hospital',
    example: 'Hospital Einstein',
  })
  name: string;

  @ApiProperty({
    description: 'Endereço do hospital',
    example: 'Av. Albert Einstein, 627',
  })
  address: string;

  @ApiProperty({
    description: 'Cidade do hospital',
    example: 'São Paulo',
  })
  city: string;

  @ApiProperty({
    description: 'Estado do hospital',
    example: 'SP',
  })
  state: string;

  @ApiProperty({
    description: 'CEP do hospital',
    example: '05652-900',
  })
  zipCode: string;

  @ApiProperty({
    description: 'Telefone do hospital',
    example: '+55 11 2151-1233',
  })
  phone: string;

  @ApiProperty({
    description: 'Email do hospital',
    example: 'contato@einstein.br',
  })
  email: string;

  @ApiProperty({
    description: 'Status ativo do hospital',
    example: true,
  })
  isActive: boolean;

  @ApiProperty({
    description: 'Clínicas vinculadas ao hospital',
    type: [ResponseClinicDTO],
    isArray: true,
  })
  @ValidateNested({ each: true }) // each: true para arrays
  @Type(() => ResponseClinicDTO)
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
  hospital: ResponseHospitalDTO;
}

export class ResponseOrganizationDTO {
  @ApiProperty({
    description: 'Dados da organização com hospital e clínicas',
    type: OrganizationHospitalDataDTO,
  })
  @ValidateNested()
  @Type(() => OrganizationHospitalDataDTO)
  organization: OrganizationHospitalDataDTO;
}
