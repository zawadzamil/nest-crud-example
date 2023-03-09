import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmployeesController } from './employees/employees.controller';
import { EmployeesService } from './employees/employees.service';
import { EmployeeSchema } from './employees/Schema/employee.schema';
import { UserSchema } from './users/schema/user.schema';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb://Admin:deadman007@localhost:27017/ts?authMechanism=DEFAULT',
    ),
    MongooseModule.forFeature([
      { name: 'User', schema: UserSchema },
      { name: 'Employee', schema: EmployeeSchema },
    ]),
  ],
  controllers: [AppController, UsersController, EmployeesController],
  providers: [AppService, UsersService, EmployeesService],
})
export class AppModule {}
