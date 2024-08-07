import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { WishlistService } from './wishlist.service';
import { User } from 'src/auth/entities/user.entity';
import { GetUser } from 'src/auth/guards/get-user.decorator';
import { CreateWishlistDto } from './dto/create-whishlist.dto';
import { RolesGuard } from 'src/auth/guards/role-auth.guard';
import { Roles } from 'src/auth/guards/role.decorator';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';
import { Role } from 'src/auth/roles.model';

@Controller('wishlist')
export class WishlistController {
  constructor(private readonly wishlistService: WishlistService) {}
  
  @Post()
  @Roles(Role.STUDENT)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async addBookToWishlist(
    @Body() createWishlistDto: CreateWishlistDto,
    @GetUser() user: User,
  ) {
    
    return this.wishlistService.createWhishList(createWishlistDto, user);
  }
  
  @Get()
  @Roles(Role.STUDENT)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async getWishlistForUser(@GetUser() user: User) {
    return this.wishlistService.getWishlistForUser(user);
  }
  
  @Delete(':id')
  @Roles(Role.STUDENT)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async removeBookFromWishlist(@Param('id') id: number, @GetUser() user: User) {
    return this.wishlistService.removeBookFromWishlist(id, user);
  }
}
