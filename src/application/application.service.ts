import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateApplicationDto } from './dto/create-application.dto';
import { UpdateApplicationDto } from './dto/update-application.dto';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class ApplicationService {
  constructor(private prisma: PrismaService) {}

  // ✅ Create Application
  async create(createApplicationDto: CreateApplicationDto) {
    return this.prisma.application.create({
      data: {
        ...createApplicationDto,
      },
    });
  }

  // ✅ Get All Applications
  async findAll() {
    return this.prisma.application.findMany({
      include: {
        job: true,
        user: true,
      },
    });
  }

  // ✅ Get Single Application by ID
  async findOne(id: string) {
    const application = await this.prisma.application.findUnique({
      where: { id },
      include: {
        job: true,
        user: true,
      },
    });

    if (!application) {
      throw new NotFoundException(`Application with ID ${id} not found`);
    }

    return application;
  }

  // ✅ Update Application
  async update(id: string, updateApplicationDto: UpdateApplicationDto) {
    const application = await this.prisma.application.findUnique({
      where: { id },
    });

    if (!application) {
      throw new NotFoundException(`Application with ID ${id} not found`);
    }

    return this.prisma.application.update({
      where: { id },
      data: {
        ...updateApplicationDto,
      },
    });
  }

  // ✅ Delete Application
  async remove(id: string) {
    const application = await this.prisma.application.findUnique({
      where: { id },
    });

    if (!application) {
      throw new NotFoundException(`Application with ID ${id} not found`);
    }

    return this.prisma.application.delete({
      where: { id },
    });
  }
}
