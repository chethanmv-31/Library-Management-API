import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import * as bcrypt from 'bcrypt';
import { StaffCredentialDto } from './dto/staff-credential.dto';
import { Staff } from './entities/staff.entity';
import { staffData } from './dto/update-staff.dto';

@Injectable()
export class StaffRepository extends Repository<Staff> {
  constructor(private dataSource: DataSource) {
    super(Staff, dataSource.createEntityManager());
  }

  async getAllStaff(): Promise<Staff[]> {
    const query = this.createQueryBuilder();
    const staffs = query.getMany();
    return staffs;
  }
  async createUser(staffCredentialDto: StaffCredentialDto): Promise<void> {
    const { email, password, role, is_admin, staff_name } =
      staffCredentialDto;

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = this.create({
      email,
      password: hashedPassword,
      role,
      is_admin,
      staff_name,
    });

    try {
      await this.save(user);
    } catch (error) {
      if (error.code == '23505') {
        throw new ConflictException('Email already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
}
