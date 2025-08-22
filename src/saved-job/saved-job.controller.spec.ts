import { Test, TestingModule } from '@nestjs/testing';
import { SavedJobController } from './saved-job.controller';
import { SavedJobService } from './saved-job.service';

describe('SavedJobController', () => {
  let controller: SavedJobController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SavedJobController],
      providers: [SavedJobService],
    }).compile();

    controller = module.get<SavedJobController>(SavedJobController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
