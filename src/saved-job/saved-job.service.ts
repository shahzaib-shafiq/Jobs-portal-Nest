import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSavedJobDto } from './dto/create-saved-job.dto';
import { UpdateSavedJobDto } from './dto/update-saved-job.dto';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class SavedJobService {
  constructor(private prisma: PrismaService) {}

  // ✅ Create Saved Job
  async create(createSavedJobDto: CreateSavedJobDto) {
    return this.prisma.savedJob.create({
      data: {
        ...createSavedJobDto,
      },
    });
  }

  // ✅ Get All Saved Jobs
  async findAll() {
    return this.prisma.savedJob.findMany({
      include: {
        user: true,
        job: true,
      },
    });
  }

  // ✅ Get One Saved Job by ID
  async findOne(id: string) {
    const savedJob = await this.prisma.savedJob.findUnique({
      where: { id },
      include: {
        user: true,
        job: true,
      },
    });

    if (!savedJob) {
      throw new NotFoundException(`SavedJob with ID ${id} not found`);
    }

    return savedJob;
  }

  // ✅ Update Saved Job
  async update(id: string, updateSavedJobDto: UpdateSavedJobDto) {
    const savedJob = await this.prisma.savedJob.findUnique({ where: { id } });

    if (!savedJob) {
      throw new NotFoundException(`SavedJob with ID ${id} not found`);
    }

    return this.prisma.savedJob.update({
      where: { id },
      data: {
        ...updateSavedJobDto,
      },
    });
  }

  // ✅ Remove Saved Job
  async remove(id: string) {
    const savedJob = await this.prisma.savedJob.findUnique({ where: { id } });

    if (!savedJob) {
      throw new NotFoundException(`SavedJob with ID ${id} not found`);
    }

    return this.prisma.savedJob.delete({
      where: { id },
    });
  }
}
