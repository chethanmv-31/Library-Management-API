import { Module } from '@nestjs/common';

import { WishlistRepository } from './wishlist.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WishList } from './entities/wishlist.entity';
import { WishlistController } from './wishlist.controller';
import { WishlistService } from './wishlist.service';

@Module({
  imports: [TypeOrmModule.forFeature([WishList])],
  providers: [WishlistService, WishlistRepository],
  controllers: [WishlistController],
})
export class WishlistModule {}
