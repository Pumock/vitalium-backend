import { ConflictException, Inject, Injectable } from '@nestjs/common';
import type { IUserRepository } from '../../../domain/interfaces/repositories/user/user.repository.interface';
import type { CreateUserDTO } from '../../../presentation/dto/userDTO/create-user.dto';
import {
  type FieldError,
  ValidationException,
} from '../../../shared/execeptions/system/validation.exception';

import { Role } from '../../../shared/enums';
import { DatabaseException } from '../../../shared/execeptions/system/database.exception';
import type { User } from '../../../infrastructure/database/models/user.models';

@Injectable()
export class CreateUserUseCase {
  constructor(
    @Inject('IUserRepository') private readonly userRepository: IUserRepository,
  ) {}

  async execute(createUserDTO: CreateUserDTO): Promise<User> {
    const errors: FieldError[] = [];

    if (!createUserDTO.email) {
      errors.push({
        field: 'email',
        value: createUserDTO.email,
        constraints: ['Email é obrigatório'],
      });
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(createUserDTO.email)) {
      errors.push({
        field: 'email',
        value: createUserDTO.email,
        constraints: ['Formato de email inválido'],
      });
    }

    if (
      !createUserDTO.firstName ||
      createUserDTO.firstName.trim().length === 0
    ) {
      errors.push({
        field: 'firstName',
        value: createUserDTO.firstName,
        constraints: ['Primeiro nome é obrigatório'],
      });
    }

    if (!createUserDTO.lastName || createUserDTO.lastName.trim().length === 0) {
      errors.push({
        field: 'lastName',
        value: createUserDTO.lastName,
        constraints: ['Último nome é obrigatório'],
      });
    }

    if (!createUserDTO.role) {
      errors.push({
        field: 'role',
        value: createUserDTO.role,
        constraints: ['Role é obrigatório'],
      });
    } else if (!Object.values(Role).includes(createUserDTO.role as Role)) {
      errors.push({
        field: 'role',
        value: createUserDTO.role,
        constraints: ['Role inválido'],
      });
    }

    if (createUserDTO.phone && !/^\+?[\d\s\-()]+$/.test(createUserDTO.phone)) {
      errors.push({
        field: 'phone',
        value: createUserDTO.phone,
        constraints: ['Formato de telefone inválido'],
      });
    }

    if (createUserDTO.firstName && createUserDTO.firstName.trim().length < 2) {
      errors.push({
        field: 'firstName',
        value: createUserDTO.firstName,
        constraints: ['Primeiro nome deve ter pelo menos 2 caracteres'],
      });
    }

    if (createUserDTO.lastName && createUserDTO.lastName.trim().length < 2) {
      errors.push({
        field: 'lastName',
        value: createUserDTO.lastName,
        constraints: ['Último nome deve ter pelo menos 2 caracteres'],
      });
    }

    if (errors.length > 0) {
      throw new ValidationException(errors);
    }

    const existingUser = await this.userRepository.findByEmail(
      createUserDTO.email,
    );

    if (existingUser) {
      throw new ConflictException('Email já está em uso', createUserDTO.email);
    }

    try {
      const user = await this.userRepository.create(createUserDTO);
      return user;
    } catch (error) {
      throw new DatabaseException('criar usuário', error);
    }
  }
}
