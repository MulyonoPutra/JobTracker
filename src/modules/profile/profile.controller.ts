import {
  Body,
  Controller,
  Delete,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';

import { ProfileService } from './profile.service';
import { CurrentUserId } from 'src/common/decorators';
import { AuthenticationGuard } from '../auth/guards/authentication.guard';
import { CreateAddressDto } from './dto/create-address.dto';
import { CreateEducationDto } from './dto/create-education.dto';
import { CreateExperienceDto } from './dto/create-experience.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { UpdateEducationDto } from './dto/update-education.dto';
import { Address } from './entities/address';
import { UpdateExperienceDto } from './dto/update-experience.dto';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @UseGuards(AuthenticationGuard)
  @Post('address')
  createAddress(
    @Body() createAddressDto: CreateAddressDto,
    @CurrentUserId() userId: string,
  ): Promise<Address> {
    return this.profileService.newAddress(createAddressDto, userId);
  }

  @Patch('address/:id')
  update(
    @Param('id') id: string,
    @Body() updateAddressDto: UpdateAddressDto,
  ): Promise<Address> {
    return this.profileService.updateAddress(id, updateAddressDto);
  }

  @UseGuards(AuthenticationGuard)
  @Post('education')
  createEducation(
    @Body() createEducationDto: CreateEducationDto[],
    @CurrentUserId() userId: string,
  ) {
    return this.profileService.newEducation(createEducationDto, userId);
  }

  @Patch('education/:id')
  updateEducation(
    @Param('id') id: string,
    @Body() updateEducationDto: UpdateEducationDto,
  ) {
    return this.profileService.updateEducation(id, updateEducationDto);
  }

  @UseGuards(AuthenticationGuard)
  @Post('experience')
  createExperience(
    @Body() createExperienceDto: CreateExperienceDto[],
    @CurrentUserId() userId: string,
  ) {
    return this.profileService.newExperience(createExperienceDto, userId);
  }

  @Patch('experience/:id')
  updateExperience(
    @Param('id') id: string,
    @Body() updateExperienceDto: UpdateExperienceDto,
  ) {
    return this.profileService.updateExperience(id, updateExperienceDto);
  }

  @Delete('experience/:id')
  removeExperience(@Param('id') id: string) {
    return this.profileService.remove(id);
  }

  @Delete('education/:id')
  removeEducation(@Param('id') id: string) {
    return this.profileService.removeEducation(id);
  }
}
