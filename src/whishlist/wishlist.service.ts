import { Injectable, NotFoundException } from '@nestjs/common';
import { WishlistRepository } from './wishlist.repository';
import { User } from 'src/auth/entities/user.entity';
import { WishList } from './entities/wishlist.entity';
import { CreateWishlistDto } from './dto/create-whishlist.dto';

@Injectable()
export class WishlistService {
  constructor(private whishListRepository: WishlistRepository) {}

  async createWhishList(
    createWishlistDto: CreateWishlistDto,
    user: User,
  ): Promise<WishList> {
    return await this.whishListRepository.addBookToWishlist(
      createWishlistDto,
      user,
    );
  }
  async getWishlistForUser(user: User): Promise<WishList[]> {
    return this.whishListRepository.find({
      where: { user },
      relations: ['book'],
    });
  }

  async removeBookFromWishlist(id: number, user: User): Promise<void> {
    const wishlistItem = await this.whishListRepository.findOne({
      where: { Id: id, user: user },
    });

    if (!wishlistItem) {
      throw new NotFoundException(`Wishlist item with ID "${id}" not found`);
    }

    await this.whishListRepository.remove(wishlistItem);
  }
}
