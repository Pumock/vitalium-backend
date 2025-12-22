import { Module } from '@nestjs/common';
import { CreateUserUseCase } from '../application/use-cases/user/create-user.use-case';
import { DeleteUserUseCase } from '../application/use-cases/user/delete-user.use-case';
import { UserDataRepository } from '../infrastructure/repositories/user/user-data.repository';
import { UserController } from '../presentation/controllers/user/user.controller';
import { PrismaModule } from '../infrastructure/database/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [UserController],
  providers: [
    //repositories
    { provide: 'IUserRepository', useClass: UserDataRepository },

    // Use Cases
    CreateUserUseCase,
    // SearchUserUseCase,
    // UpdateUserUseCase,
    DeleteUserUseCase,
  ],
})
export class UserModule { }
