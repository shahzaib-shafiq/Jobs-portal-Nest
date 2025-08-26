import { Injectable, NotFoundException,ConflictException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';

@Injectable()
export class CompanyService {
  constructor(private prisma: PrismaService) {}


  async create(createCompanyDto: CreateCompanyDto) {
  const { name,registrationId } = createCompanyDto;  // ✅ extract name

  // Check if company already exists
  const existingCompany = await this.prisma.company.findFirst({
  where: {
    AND: [
      { name },
      { registrationId }
    ]
  },
});

  if (existingCompany) {
    throw new ConflictException('Company with this name or registrationId already exists');
  }

  // Create new company
  return this.prisma.company.create({
    data: createCompanyDto,
  });
}

  async findAll() {
    return this.prisma.company.findMany({
      include: {
        createdBy: true, // optional: include user who created the company
        jobs: true,      // optional: include related jobs
      },
    });
  }

  async findOne(id: string) {
    const company = await this.prisma.company.findUnique({
      where: { id },
      include: {
        createdBy: true,
        jobs: true,
      },
    });

    if (!company) {
      throw new NotFoundException(`Company with ID ${id} not found`);
    }

    return company;
  }

  async update(id: string, updateCompanyDto: UpdateCompanyDto) {
    return this.prisma.company.update({
      where: { id },
      data: updateCompanyDto,
    });
  }

  async remove(id: string) {
    return this.prisma.company.delete({
      where: { id },
    });
  }
}
