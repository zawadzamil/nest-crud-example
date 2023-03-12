import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { IEmployee } from './Interface/employee.interface';

@Injectable()
export class EmployeesService {
  constructor(
    @InjectModel('Employee') private employeeModel: Model<IEmployee>,
  ) {}

  async create(CreateEmployeeDto: CreateEmployeeDto): Promise<IEmployee> {
    const employee = await this.employeeModel.create(CreateEmployeeDto);
    return employee.save();
  }

  async getAll(): Promise<IEmployee[]> {
    const employee = await this.employeeModel.find();
    return employee;
  }

  async get(id: string): Promise<IEmployee> {
    const employee = await this.employeeModel.findById(id);
    return employee;
  }
  async update(
    id: string,
    updateEmployeeDto: UpdateEmployeeDto,
  ): Promise<IEmployee> {
    const employee = await this.employeeModel.findByIdAndUpdate(
      id,
      updateEmployeeDto,
      {
        new: true,
      },
    );
    return employee;
  }

  async remove(id: string): Promise<IEmployee> {
    const employee = await this.employeeModel.findByIdAndDelete(id);
    return employee;
  }
}
