import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SavedJobService } from './saved-job.service';
import { CreateSavedJobDto } from './dto/create-saved-job.dto';
import { UpdateSavedJobDto } from './dto/update-saved-job.dto';

@Controller('savejob')
export class SavedJobController {
  constructor(private readonly savedJobService: SavedJobService) {}

  @Post()
  create(@Body() createSavedJobDto: CreateSavedJobDto) {
    return this.savedJobService.create(createSavedJobDto);
  }

  @Get()
  findAll() {
    return this.savedJobService.findAll();
  }
   @Get(':id')
  findOne(@Param('id') id: string) {
    return this.savedJobService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.savedJobService.remove(id);
  }
}
