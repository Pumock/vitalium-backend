import { User } from 'src/infrastructure/database/models/user.models';
import { CreateUserDTO } from 'src/presentation/dto/userDTO/create-user.dto';
export interface IUserRepository {
  // Métodos básicos
  create(createUserDTO: CreateUserDTO): Promise<User>;
  findByEmail(email: string): Promise<User | null>;
  findById(id: string): Promise<User | null>;
  findAll(): Promise<User[]>;
  update(id: string, updateData: Partial<User>): Promise<User>;
  delete(id: string): Promise<void>;
}
