import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialDto } from './dto/auth-credential.dto';
import { UserSignInDto } from './dto/auth-signin.dto';
import { RolesGuard } from './guards/role-auth.guard';
import { Roles } from './guards/role.decorator';
import { Role } from './roles.model';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('Auth')

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  @Roles(Role.ADMIN)
  @Roles(Role.CLERK)
  @Roles(Role.LIBRARIAN)
  @Roles(Role.STUDENT)
  // @UseGuards(RolesGuard)
  signUp(@Body() authCredentialDto: AuthCredentialDto): Promise<void> {
    return this.authService.signUp(authCredentialDto);
  }

  @Post('/signin')
  @Roles(Role.ADMIN)
  @Roles(Role.CLERK)
  @Roles(Role.LIBRARIAN)
  @Roles(Role.STUDENT)
  // @UseGuards(RolesGuard)
  singIn(
    @Body() userSignInDto: UserSignInDto,
  ): Promise<{ accessToken: string }> {
    return this.authService.signIn(userSignInDto);
  }
}
