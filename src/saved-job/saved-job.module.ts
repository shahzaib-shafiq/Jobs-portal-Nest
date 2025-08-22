import { Module } from '@nestjs/common';
import { SavedJobService } from './saved-job.service';
import { SavedJobController } from './saved-job.controller';

@Module({
  controllers: [SavedJobController],
  providers: [SavedJobService],
})
export class SavedJobModule {}
