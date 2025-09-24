import { Injectable } from '@nestjs/common';
import { PrismaProvider } from '../database/prisma.provider';
import { IUserRepository } from '../../domain/interfaces/repositories/user.repository.interface';
import { User } from '../database/models/user.models';
import { CreateUserDTO } from '../../presentation/dto/userDTO/create-user.dto';

@Injectable()
export class UserDataRepository implements IUserRepository {
  constructor(private readonly prisma: PrismaProvider) {}

  async create(createUserDto: CreateUserDTO): Promise<User> {
    const createdUser = await this.prisma.user.create({
      data: {
        email: createUserDto.email,
        password: createUserDto.password,
        firstName: createUserDto.firstName,
        lastName: createUserDto.lastName,
        phone: createUserDto.phone,
        avatar: createUserDto.avatar,
        isActive: createUserDto.isActive,
        role: createUserDto.role,
      },
    });

    return createdUser;
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return null;
    }

    return user;
  }

  async findById(id: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      return null;
    }

    return user;
  }

  async findAll(): Promise<User[]> {
    const users = await this.prisma.user.findMany({
      orderBy: { createdAt: 'desc' },
    });

    return users;
  }

  async update(id: string, updateData: Partial<User>): Promise<User> {
    const updatedUser = await this.prisma.user.update({
      where: { id },
      data: {
        email: updateData.email,
        firstName: updateData.firstName,
        lastName: updateData.lastName,
        phone: updateData.phone,
        avatar: updateData.avatar,
        isActive: updateData.isActive,
        role: updateData.role,
        updatedAt: new Date(),
      },
    });

    return updatedUser;
  }

  async delete(id: string): Promise<void> {
    await this.prisma.user.delete({
      where: { id },
    });
  }
}
