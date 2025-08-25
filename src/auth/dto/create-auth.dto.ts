import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength, IsEnum } from 'class-validator';
import { Role } from '@prisma/client';  // ✅ use Prisma's Role

export class CreateAuthDto {
  @IsNotEmpty()
  @IsString()
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
  @IsEnum(Role)   // ✅ validates against Prisma enum
  role: Role;

  @IsOptional()
  @IsString()
  profileSummary?: string;

  @IsOptional()
  @IsString()
  resumeUrl?: string;
}
