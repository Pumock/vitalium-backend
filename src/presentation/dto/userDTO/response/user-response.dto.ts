import { Exclude, Expose } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Admin } from '../../../../infrastructure/database/models/admin.models';
import { Caregiver } from '../../../../infrastructure/database/caregiver.models';
import { Doctor } from '../../../../infrastructure/database/models/doctor.models';
import { Nurse } from '../../../../infrastructure/database/models/nurse.models';
import { Patient } from '../../../../infrastructure/database/models/patient.models';
import { Role } from '../../../../shared/enums';

export class UserResponseDTO {
  @ApiProperty({
    description: 'ID único do usuário',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @Expose()
  id: string;

  @ApiProperty({
    description: 'Email do usuário',
    example: 'joao@exemplo.com',
  })
  @Expose()
  email: string;

  @Exclude()
  password: string;

  @ApiProperty({
    description: 'Primeiro nome do usuário',
    example: 'João',
  })
  @Expose()
  firstName: string;

  @ApiProperty({
    description: 'Sobrenome do usuário',
    example: 'Silva',
  })
  @Expose()
  lastName: string;

  @ApiPropertyOptional({
    description: 'Telefone do usuário',
    example: '+55 11 99999-9999',
  })
  @Expose()
  phone?: string;

  @ApiPropertyOptional({
    description: 'URL do avatar do usuário',
    example: 'https://exemplo.com/avatar.jpg',
  })
  @Expose()
  avatar?: string;

  @ApiProperty({
    description: 'Status ativo/inativo do usuário',
    example: true,
  })
  @Expose()
  isActive: boolean;

  @ApiProperty({
    description: 'Função do usuário no sistema',
    enum: Role,
    example: Role.PATIENT,
  })
  @Expose()
  role: Role;

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

  patient?: Patient;
  doctor?: Doctor;
  nurse?: Nurse;
  caregiver?: Caregiver;
  admin?: Admin;
}
