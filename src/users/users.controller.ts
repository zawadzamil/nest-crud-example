import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Res,
} from '@nestjs/common';
import { mongo } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async createUser(@Res() response, @Body() createUserDto: CreateUserDto) {
    try {
      const newUser = await this.usersService.create(createUserDto);
      return response.status(HttpStatus.CREATED).json({
        message: 'User has been created successfully',
        newUser,
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Error: User not created!',
        error:
          err instanceof mongo.MongoError && err.code === 11000
            ? 'Email already exists'
            : 'Bad Request',
      });
    }
  }

  @Get()
  async findAll(@Res() response) {
    try {
      const users = await this.usersService.findAll();
      return response.status(HttpStatus.OK).json({ data: users });
    } catch (error) {
      return response.status(HttpStatus.BAD_GATEWAY).json({ error: error });
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Res() response) {
    const user = await this.usersService.findOne(id);
    return response.status(HttpStatus.OK).json({
      data: user,
    });
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @Res() response,
  ) {
    const user = await this.usersService.update(id, updateUserDto);
    return response.status(HttpStatus.OK).json({
      message: 'User updated successfully.',
      data: user,
    });
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Res() response) {
    const user = await this.usersService.remove(id);
    return response.json({ message: 'User removed successfully.' });
  }
}
