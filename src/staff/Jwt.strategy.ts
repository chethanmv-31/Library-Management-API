import { ConfigService } from '@nestjs/config';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { StaffRepository } from './staff.repository';
import { JwtPayload } from './jwt-payload.interface';
import { Staff } from './entities/staff.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(StaffRepository)
    private staffRepository: StaffRepository,
    private configService: ConfigService,
  ) {
    super({
      secretOrKey: configService.get('JWT_SECRETE_KEY'),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload: JwtPayload): Promise<Staff> {
    const { email } = payload;
    const user = this.staffRepository.findOne({ where: { email } });

    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
