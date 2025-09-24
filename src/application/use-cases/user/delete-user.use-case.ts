import { Inject, Injectable } from '@nestjs/common';
import { IUserRepository } from 'src/domain/interfaces/repositories/user.repository.interface';
import { DatabaseException } from 'src/shared/execeptions/system/database.exception';
import { UserNotFoundException } from 'src/shared/execeptions/user/user-not-found.exception';

@Injectable()
export class DeleteUserUseCase {
  @Inject('IUserRepository') private readonly userRepository: IUserRepository;

  async execute(id: string): Promise<void> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new UserNotFoundException(`ID: ${id}`);
    }

    try {
      await this.userRepository.delete(id);
    } catch (error) {
      throw new DatabaseException('Erro ao deletar o usuário', error);
    }
  }
}
