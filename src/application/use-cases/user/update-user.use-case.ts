import { Inject, Injectable } from '@nestjs/common';
import { IUserRepository } from 'src/domain/interfaces/repositories/user.repository.interface';
import { User } from 'src/infrastructure/database/models/user.models';
import { UpdateUserDTO } from 'src/presentation/dto/userDTO/update-user.dtp';
import { UserNotFoundException } from 'src/shared/execeptions/user/user-not-found.exception';

@Injectable()
export class UpdateUserUseCase {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(id: string, updateUserDTO: UpdateUserDTO): Promise<User> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new UserNotFoundException(`ID: ${id}`);
    }

    const updatedUser = await this.userRepository.update(id, updateUserDTO);
    return updatedUser;
  }
}
