import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthRepository } from './auth.repository';
import { AuthCredentialDto } from './dto/auth-credential.dto';
import { UserSignInDto } from './dto/auth-signin.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt/jwt-payload.interface';
import { User } from './entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly authRepository: AuthRepository,
    private jwtService: JwtService,
  ) {}

  async signUp(authCredentialDto: AuthCredentialDto): Promise<void> {
    return this.authRepository.createUser(authCredentialDto);
  }

  async signIn(userSigninDto: UserSignInDto): Promise<{ accessToken: string }> {
    const { username, password, role } = userSigninDto;
    const user = await this.authRepository.findOne({ where: { username } });

    if (
      user &&
      (await bcrypt.compare(password, user.password)) &&
      user.role === role
    ) {
      const payload = {
        username: user.username,
        sub: user.id,
        role: user.role,
      };
      const accessToken: string = this.jwtService.sign(payload);
      return { accessToken };
    } else {
      throw new UnauthorizedException('Please check your login credentials');
    }
  }

  async updateProfilePic(id: string, imageUrl: string): Promise<User> {
    const user = await this.authRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    user.profile_pic = imageUrl;
    user.updated_at = new Date();
    return this.authRepository.save(user);
  }
}
