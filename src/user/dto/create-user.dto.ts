import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength, IsEnum } from 'class-validator';
import { Role } from '@prisma/client';  // ✅ use Prisma's Role
export class CreateUserDto {

 @IsString()
   @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @IsNotEmpty()
  @IsEnum(Role) 
  role: Role;

  @IsOptional()
  @IsString()
  profileSummary?: string;

  @IsOptional()
  @IsString()
  resumeUrl?: string;

}
