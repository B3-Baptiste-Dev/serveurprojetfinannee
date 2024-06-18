import { IsEmail, IsNotEmpty, IsString, Matches, MinLength } from 'class-validator';

export class RegisterDTO {
  @IsEmail({}, { message: 'Please enter a valid email address' })
  @IsNotEmpty({ message: 'Email should not be empty' })
  email: string;

  @IsString({ message: 'Please enter a valid first name' })
  @IsNotEmpty({ message: 'First name should not be empty' })
  firstName: string;

  @IsString({ message: 'Please enter a valid last name' })
  @IsNotEmpty({ message: 'Last name should not be empty' })
  lastName: string;

  @IsString({ message: 'Please enter a valid password' })
  @MinLength(8, { message: 'Password should be at least 8 characters long' })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#\$&*~]).{8,}$/, { message: 'Password should contain at least one uppercase letter, one lowercase letter, one number, and one special character' })
  password: string;
}
