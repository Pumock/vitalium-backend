import { Inject, Injectable } from '@nestjs/common';
import { User } from 'src/infrastructure/database/models/user.models';
import { IUserRepository } from 'src/domain/interfaces/repositories/user.repository.interface';
import { ValidationException } from 'src/shared/execeptions/system/validation.exception';
import { UserNotFoundException } from 'src/shared/execeptions/user/user-not-found.exception';

@Injectable()
export class SearchUserUseCase {
  constructor(
    @Inject('UserRepository') private readonly userRepository: IUserRepository,
  ) {}

  // Buscar usuário por ID
  async findById(id: string): Promise<User> {
    if (!id) {
      throw new ValidationException([
        {
          field: 'id',
          value: id,
          constraints: ['ID é obrigatório'],
        },
      ]);
    }

    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new UserNotFoundException();
    }

    return user;
  }

  async findByEmail(email: string): Promise<User> {
    if (!email) {
      throw new ValidationException([
        {
          field: 'email',
          value: email,
          constraints: ['Email é obrigatório'],
        },
      ]);
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new ValidationException([
        {
          field: 'email',
          value: email,
          constraints: ['Formato de email inválido'],
        },
      ]);
    }

    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new UserNotFoundException();
    }

    return user;
  }

  async findAll(): Promise<User[]> {
    const users = await this.userRepository.findAll();
    return users;
  }
}
