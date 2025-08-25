import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';

@Injectable()
export class JobService {
  constructor(private prisma: PrismaService) {}

async create(createJobDto: CreateJobDto) {
  return this.prisma.job.create({
    data: createJobDto as any, // 👈 bypass TS type check
  });
}

  async findAll() {
    return this.prisma.job.findMany({
      include: {
        createdBy: true,  // ✅ include user who created the job
        company: true,    // ✅ include company info
        applications: true,
        savedJobs: true,
      },
    });
  }

  async findOne(id: string) {
    const job = await this.prisma.job.findUnique({
      where: { id },
      include: {
        createdBy: true,
        company: true,
        applications: true,
        savedJobs: true,
      },
    });

    if (!job) {
      throw new NotFoundException(`Job with ID ${id} not found`);
    }

    return job;
  }

  async update(id: string, updateJobDto: UpdateJobDto) {
    return this.prisma.job.update({
      where: { id },
      data: updateJobDto as any,
    });
  }

  async remove(id: string) {
    return this.prisma.job.delete({
      where: { id },
    });
  }
}
