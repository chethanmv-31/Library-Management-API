import { DataSource, Repository } from 'typeorm';
import { WishList } from 'src/whishlist/entities/wishlist.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from 'src/auth/entities/user.entity';
import { CreateWishlistDto } from './dto/create-whishlist.dto';

@Injectable()
export class WishlistRepository extends Repository<WishList> {
  constructor(private dataSource: DataSource) {
    super(WishList, dataSource.createEntityManager());
  }

  async addBookToWishlist(createWishlistDto: CreateWishlistDto, user: User): Promise<WishList> {
    const { bookId } = createWishlistDto;

    const wishlist = this.create({
      user,
      book: { id: bookId },
    });
    wishlist.createdAt = new Date();

    await this.save(wishlist);
    return wishlist;
  }

}
