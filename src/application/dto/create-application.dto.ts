import { IsNotEmpty, IsOptional, IsString, IsUUID, IsEnum } from 'class-validator';
import { ApplicationStatus } from '@prisma/client';

export class CreateApplicationDto {
  @IsUUID()
  @IsNotEmpty()
  jobId: string;

  @IsUUID()
  @IsNotEmpty()
  userId: string;

  @IsOptional()
  @IsString()
  coverLetter?: string;

  @IsOptional()
  @IsString()
  resumeUrl?: string;

  @IsOptional()
  @IsEnum(ApplicationStatus)
  status?: ApplicationStatus; // default PENDING (if not passed)
}
