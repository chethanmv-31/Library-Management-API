import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialDto } from './dto/auth-credential.dto';
import { UserSignInDto } from './dto/auth-signin.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signUp(@Body() authCredentialDto: AuthCredentialDto): Promise<void> {
    return this.authService.signUp(authCredentialDto);
  }

  @Post('/signin')
  singIn(
    @Body() userSignInDto: UserSignInDto,
  ): Promise<{ accessToken: string }> {
    return this.authService.signIn(userSignInDto);
  }
}
