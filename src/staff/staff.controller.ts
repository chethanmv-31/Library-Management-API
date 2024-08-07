import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { StaffService } from './staff.service';
import { StaffCredentialDto } from './dto/staff-credential.dto';
import { StaffSignInDto } from './dto/staff-signin.dto';
import { Staff } from './entities/staff.entity';
import { staffData, UpdateStaffDto } from './dto/update-staff.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('staff')

export class StaffController {
  constructor(private staffService: StaffService) {}

  @Post('/loginStaff')
  loginStaff(
    @Body() staffSignInDto: StaffSignInDto,
  ): Promise<{ accessToken: string }> {
    return this.staffService.signInStaff(staffSignInDto);
  }

  @Post('/createStaff')
  @UseGuards(AuthGuard())
  createStaff(@Body() staffCredentialDto: StaffCredentialDto): Promise<void> {
    return this.staffService.createStaff(staffCredentialDto);
  }

  @Get()
  @UseGuards(AuthGuard())
  getStaffs(): Promise<Staff[]> {
    return this.staffService.getStaffs();
  }

  @Get('/:email')
  @UseGuards(AuthGuard())
  getAuthorByEmail(@Param('email') email: string): Promise<Staff> {
    return this.staffService.getStaffByEmail(email);
  }

  @Delete('/:email')
  @UseGuards(AuthGuard())
  deleteStaffByEmail(@Param('email') email: string): Promise<string> {
    return this.staffService.deleteStaffByEmail(email);
  }

  @Patch('/:email')
  @UseGuards(AuthGuard())
  updateStaff(
    @Param('email') email: string,
    @Body() updateStaffDto: UpdateStaffDto,
  ): Promise<Staff> {
    return this.staffService.updateStaff(email, updateStaffDto);
  }
}
