import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Res,
} from '@nestjs/common';
import { mongo } from 'mongoose';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { EmployeesService } from './employees.service';

@Controller('employees')
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}

  @Post()
  async create(@Body() createEmployeeDto: CreateEmployeeDto, @Res() response) {
    try {
      const employee = await this.employeesService.create(createEmployeeDto);
      response.status(HttpStatus.CREATED).json({
        message: 'Employee created successfully.',
        data: employee,
      });
    } catch (error) {
      response.status(HttpStatus.BAD_REQUEST).json({
        message: 'Error creating employee',
        error:
          error instanceof mongo.MongoError && error.code === 11000
            ? 'Phone No. already exists'
            : 'Bad Request',
      });
    }
  }

  @Get()
  async findAll(@Res() response) {
    const employee = await this.employeesService.getAll();
    response.status(HttpStatus.OK).json({
      data: employee,
    });
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Res() response) {
    const employee = await this.employeesService.get(id);
    if (!employee) {
      response.status(404).json({ message: 'Employee not found.' });
    }
    response.status(HttpStatus.OK).json({ data: employee });
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateEmployeeDto: UpdateEmployeeDto,
    @Res() response,
  ) {
    try {
      const employee = await this.employeesService.update(
        id,
        updateEmployeeDto,
      );
      if (!employee) {
        response.status(HttpStatus.NOT_FOUND).json({
          message: 'Employees not found',
        });
      }
      response
        .status(HttpStatus.OK)
        .json({ message: 'Employees updated successfully', data: employee });
    } catch (error) {
      response.status(400).json({ message: error.message });
    }
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.employeesService.remove(+id);
  // }
}
