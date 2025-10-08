import { Module } from '@nestjs/common';
import { CreateUserUseCase } from 'src/application/use-cases/user/create-user.use-case';
import { DeleteUserUseCase } from 'src/application/use-cases/user/delete-user.use-case';
import { SearchUserUseCase } from 'src/application/use-cases/user/search-user.use-case';
import { UpdateUserUseCase } from 'src/application/use-cases/user/update-user.use-case';
import { PrismaModule } from 'src/infrastructure/database/prisma.module';
import { UserDataRepository } from 'src/infrastructure/repositories/user/user-data.repository';
import { UserController } from 'src/presentation/controllers/user/user.controller';

@Module({
  imports: [PrismaModule],
  controllers: [UserController],
  providers: [
    //repositories
    { provide: 'IUserRepository', useClass: UserDataRepository },

    // Use Cases
    CreateUserUseCase,
    SearchUserUseCase,
    UpdateUserUseCase,
    DeleteUserUseCase,
  ],
})
export class UserModule {}
