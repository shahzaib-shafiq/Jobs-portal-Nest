import { IsNotEmpty, IsOptional, IsString, IsUUID, IsNumber, IsEnum } from 'class-validator';

// ✅ Define JobType enum (must match your Prisma schema)
export enum JobType {
  FULL_TIME = 'FULL_TIME',
  PART_TIME = 'PART_TIME',
  CONTRACT = 'CONTRACT',
  INTERNSHIP = 'INTERNSHIP',
  REMOTE = 'REMOTE',
}

export class CreateJobDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsOptional()
  @IsString()
  location?: string;

  @IsNotEmpty()
  @IsEnum(JobType)
  jobType: JobType;

  @IsOptional()
  @IsNumber()
  salary?: number;

  @IsOptional()
  @IsUUID()
  createdById?: string ;

  @IsOptional()
  @IsUUID()
  companyId?: string;
}
