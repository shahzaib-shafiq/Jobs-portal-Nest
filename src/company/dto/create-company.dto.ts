import { IsNotEmpty, IsOptional, IsString, IsUrl, IsUUID, MaxLength,Matches } from 'class-validator';

export class CreateCompanyDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(150)
  name: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(10)
  @Matches(/^REF-\d{6}$/, {
    message: 'registrationId must be in the format REF-XXXXXX (e.g. REF-753456)',
  })
  registrationId:string

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  industry?: string;

  @IsOptional()
  @IsUrl()
  website?: string;

  @IsOptional()
  @IsUrl()
  logoUrl?: string;

  @IsOptional()
  @IsUUID()
  createdById?: string;
}
