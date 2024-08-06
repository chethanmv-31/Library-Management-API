import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { StaffService } from './staff.service';
import { StaffCredentialDto } from './dto/staff-credential.dto';
import { StaffSignInDto } from './dto/staff-signin.dto';
import { Staff } from './entities/staff.entity';
import { staffData, UpdateStaffDto } from './dto/update-staff.dto';

@Controller('staff')
export class StaffController {
  constructor(private staffService: StaffService) {}

  @Post('/staffLogin')
  signUp(
    @Body() staffSignInDto: StaffSignInDto,
  ): Promise<{ accessToken: string }> {
    return this.staffService.signInStaff(staffSignInDto);
  }

  @Post('/createStaff')
  createStaff(@Body() staffCredentialDto: StaffCredentialDto): Promise<void> {
    return this.staffService.createStaff(staffCredentialDto);
  }

  @Get()
  getStaffs(): Promise<Staff[]> {
    return this.staffService.getStaffs();
  }

  @Get('/:email')
  getAuthorByEmail(@Param('email') email: string): Promise<Staff> {
    return this.staffService.getStaffByEmail(email);
  }

  @Delete('/:email')
  deleteStaffByEmail(@Param('email') email: string): Promise<string> {
    return this.staffService.deleteStaffByEmail(email);
  }

  @Patch('/:email')
  updateStaff(
    @Param('email') email: string,
    @Body() updateStaffDto: UpdateStaffDto,
  ): Promise<Staff> {
    return this.staffService.updateStaff(email, updateStaffDto);
  }
}
