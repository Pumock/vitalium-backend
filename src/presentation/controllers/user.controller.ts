import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { CreateUserDTO } from '../dto/userDTO/create-user.dto';
import { UserResponseDTO } from '../dto/userDTO/response/user-response.dto';
import { UpdateUserDTO } from '../dto/userDTO/update-user.dtp';

@Controller('animes')
export class AnimesController {
  constructor(private readonly createUserUseCase: CreateUserUseCase) {}
  constructor(private readonly searchUserUseCase: SearchUserUseCase) {}
  constructor(private readonly updateUserUseCase: UpdateUserUseCase) {}
  constructor(private readonly deleteUserUseCase: DeleteUserUseCase) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createUserDTO: CreateUserDTO): Promise<UserResponseDTO> {
    const user = await this.createUserUseCase.execute(createUserDTO);

    return plainToInstance(UserResponseDTO, user, {
      excludeExtraneousValues: true,
    });
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(): Promise<UserResponseDTO> {
    const users = await this.searchUserUseCase.findAll();

    return plainToInstance(UserResponseDTO, users, {
      excludeExtraneousValues: true,
    });
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id') id: string): Promise<UserResponseDTO> {
    const user = await this.searchUserUseCase.findOne(id);

    return plainToInstance(UserResponseDTO, user, {
      excludeExtraneousValues: true,
    });
  }

  @Get('email/:email')
  @HttpCode(HttpStatus.OK)
  async findByEmail(@Param('email') email: string): Promise<UserResponseDTO> {
    const user = await this.searchUserUseCase.findByEmail(email);

    return plainToInstance(UserResponseDTO, user, {
      excludeExtraneousValues: true,
    });
  }

  @Patch('/:id')
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id') id: string,
    @Body() updateUserDTO: UpdateUserDTO,
  ): Promise<UserResponseDTO> {
    const user = await this.updateUserUseCase.execute(id, updateUserDTO);

    return plainToInstance(UserResponseDTO, user, {
      excludeExtraneousValues: true,
    });
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id') id: string): Promise<void> {
    return this.deleteUserUseCase.execute(id);
  }
}
