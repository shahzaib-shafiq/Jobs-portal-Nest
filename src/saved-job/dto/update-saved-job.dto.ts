import { PartialType } from '@nestjs/mapped-types';
import { CreateSavedJobDto } from './create-saved-job.dto';

export class UpdateSavedJobDto extends PartialType(CreateSavedJobDto) {}
