import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class ResponseUnitDTO {
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
