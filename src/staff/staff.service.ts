import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { StaffRepository } from './staff.repository';
import { StaffCredentialDto } from './dto/staff-credential.dto';
import { StaffSignInDto } from './dto/staff-signin.dto';
import { JwtPayload } from './jwt-payload.interface';
import * as bcrypt from 'bcrypt';
import { Staff } from './entities/staff.entity';
import { staffData, UpdateStaffDto } from './dto/update-staff.dto';

@Injectable()
export class StaffService {
  constructor(
    private readonly staffRepository: StaffRepository,
    private jwtService: JwtService,
  ) {}

  async signInStaff(
    staffSignInDto: StaffSignInDto,
  ): Promise<{ accessToken: string }> {
    const { email, password } = staffSignInDto;
    const staff = await this.staffRepository.findOne({ where: { email } });

    if (staff && (await bcrypt.compare(password, staff.password))) {
      const payload: JwtPayload = { email };
      const accessToken: string = this.jwtService.sign(payload);
      return { accessToken };
    } else {
      throw new UnauthorizedException('Please check your login credentials');
    }
  }

  async createStaff(staffCredentialDto: StaffCredentialDto): Promise<void> {
    return this.staffRepository.createUser(staffCredentialDto);
  }

  async getStaffByEmail(email: string): Promise<Staff> {
    const found = await this.staffRepository.findOne({
      where: { email: email },
    });

    if (!found) {
      throw new NotFoundException(
        `Staff is not found with this email '${email}'`,
      );
    }
    return found;
  }

  async deleteStaffByEmail(email: string): Promise<string> {
    const result = await this.staffRepository.delete({ email: email });
    if (result.affected === 0) {
      throw new NotFoundException(`Author with id "${email}" is not found!`);
    }
    if (result.affected === 1) {
      return `Delete Success`;
    }
  }

  async getStaffs(): Promise<Staff[]> {
    return this.staffRepository.getAllStaff();
  }
  async updateStaff(
    email: string,
    updateStaffDto: UpdateStaffDto,
  ): Promise<Staff> {
    const { staff_name, designation, is_admin } = updateStaffDto;

    const staff = await this.getStaffByEmail(email);

    staff.is_admin = is_admin;
    staff.designation = designation;
    staff.staff_name = staff_name;
    this.staffRepository.save(staff);

    return staff;
  }
}
