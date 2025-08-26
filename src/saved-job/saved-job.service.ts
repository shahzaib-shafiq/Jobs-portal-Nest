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


//RAW Query

//   async findOne(id: string) {
//   const savedJob = await this.prisma.$queryRaw<
//     Array<{
//       id: string;
//       createdAt: Date;
//       userId: string;
//       jobId: string;
//       user_firstName: string;
//       user_lastName: string;
//       job_title: string;
//       job_description: string;
//     }>
//   >`
//     SELECT 
//       s.id, 
//       s."createdAt", 
//       s."userId", 
//       s."jobId",
//       u.first_name as user_firstName,
//       u.last_name as user_lastName,
//       j.title as job_title,
//       j.description as job_description
//     FROM "SavedJob" s
//     JOIN "User" u ON s."userId" = u.id
//     JOIN "Job" j ON s."jobId" = j.id
//     WHERE s.id = ${id}
//   `;

//   if (savedJob.length === 0) {
//     throw new NotFoundException(`SavedJob with ID ${id} not found`);
//   }

//   return savedJob[0]; // return the first result since IDs are unique
// }

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
