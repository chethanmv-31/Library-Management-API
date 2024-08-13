import {
  Body,
  Controller,
  Param,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialDto } from './dto/auth-credential.dto';
import { UserSignInDto } from './dto/auth-signin.dto';
import { RolesGuard } from './guards/role-auth.guard';
import { Roles } from './guards/role.decorator';
import { Role } from './roles.model';
import { FileInterceptor } from '@nestjs/platform-express';
import { S3Service } from 'src/s3Service';
import { JwtAuthGuard } from './jwt/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private readonly s3Service: S3Service,
  ) {}

  @Post('/signup')
  signUp(@Body() authCredentialDto: AuthCredentialDto): Promise<void> {
    return this.authService.signUp(authCredentialDto);
  }

  @Post('/signin')
  @Roles(Role.ADMIN)
  @Roles(Role.CLERK)
  @Roles(Role.LIBRARIAN)
  @Roles(Role.STUDENT)
  singIn(
    @Body() userSignInDto: UserSignInDto,
  ): Promise<{ accessToken: string }> {
    return this.authService.signIn(userSignInDto);
  }

  @Post(':id/upload')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('image'))
  async uploadBookImage(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const imageUrl = await this.s3Service.uploadFile(file, 'profile-image');
    return this.authService.updateProfilePic(id, imageUrl);
  }
}
