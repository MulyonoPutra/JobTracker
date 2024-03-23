import { Address } from './entities/address';
import { CreateAddressDto } from './dto/create-address.dto';
import { CreateEducationDto } from './dto/create-education.dto';
import { CreateExperienceDto } from './dto/create-experience.dto';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateAddressDto } from './dto/update-address.dto';
import { UpdateEducationDto } from './dto/update-education.dto';
import { UpdateExperienceDto } from './dto/update-experience.dto';

@Injectable()
export class ProfileService {
  constructor(private prismaService: PrismaService) {}

  /**
   * Create a new Address
   * @param createAddressDto
   * @param userId
   * @returns Address
   */
  async newAddress(
    createAddressDto: CreateAddressDto,
    userId?: string,
  ): Promise<Address> {
    if (userId) {
      createAddressDto.userId = userId;
    }
    return await this.prismaService.address.create({
      data: createAddressDto,
    });
  }

  /**
   * Update an existing Address
   * @param id
   * @param updateAddressDto
   * @returns
   */
  async updateAddress(
    id: string,
    updateAddressDto: UpdateAddressDto,
  ): Promise<Address> {
    return await this.prismaService.address.update({
      data: updateAddressDto,
      where: { id },
    });
  }

  /**
   * Create new Education
   * @param createEducationDto
   * @param userId
   * @returns
   */
  async newEducation(createEducationDto: CreateEducationDto, userId?: string) {
    if (userId) {
      createEducationDto.userId = userId;
    }
    return await this.prismaService.education.create({
      data: createEducationDto,
    });
  }

  /**
   * Update existing Education
   * @param id
   * @param updateEducationDto
   * @returns
   */
  async updateEducation(id: string, updateEducationDto: UpdateEducationDto) {
    return await this.prismaService.education.update({
      data: updateEducationDto,
      where: { id },
    });
  }

  async removeEducation(id: string) {
    return await this.prismaService.education.delete({
      where: { id },
    });
  }

  /**
   * Create new Experience
   * @param createExperienceDto
   * @param userId
   * @returns
   */
  async newExperience(
    createExperienceDto: CreateExperienceDto[],
    userId?: string,
  ) {
    const experiences = createExperienceDto.map((dto) => {
      if (userId) {
        dto.userId = userId;
      }
      return dto;
    });
    return await this.prismaService.experience.createMany({
      data: experiences,
    });
  }

  /**
   * Update existing Experience
   * @param id
   * @param updateExperienceDto
   * @returns
   */
  async updateExperience(id: string, updateExperienceDto: UpdateExperienceDto) {
    return await this.prismaService.experience.update({
      data: updateExperienceDto,
      where: { id },
    });
  }

  async remove(id: string) {
    return await this.prismaService.experience.delete({
      where: { id },
    });
  }
}
