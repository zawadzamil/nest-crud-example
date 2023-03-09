import { IsNotEmpty, IsNumber, IsString, MaxLength } from 'class-validator';

export class CreateEmployeeDto {
  @IsString()
  @MaxLength(100)
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @MaxLength(15)
  @IsNotEmpty()
  readonly phone: string;

  @IsNumber()
  @IsNotEmpty()
  readonly age: number;
}
