import { Injectable } from '@nestjs/common';
import { CreateSavedJobDto } from './dto/create-saved-job.dto';
import { UpdateSavedJobDto } from './dto/update-saved-job.dto';

@Injectable()
export class SavedJobService {
  create(createSavedJobDto: CreateSavedJobDto) {
    return 'This action adds a new savedJob';
  }

  findAll() {
    return `This action returns all savedJob`;
  }

  findOne(id: number) {
    return `This action returns a #${id} savedJob`;
  }

  update(id: number, updateSavedJobDto: UpdateSavedJobDto) {
    return `This action updates a #${id} savedJob`;
  }

  remove(id: number) {
    return `This action removes a #${id} savedJob`;
  }
}
