import { Book } from 'src/books/entities/book.entity';
import { Borrowers } from 'src/borrowers/entities/borrowers.entity';
import { PrimaryGeneratedColumn, Column, Entity, OneToMany } from 'typeorm';
import { Role } from '../roles.model';
import { WishList } from 'src/whishlist/entities/wishlist.entity';
import { Rating } from 'src/ratings/entities/rating.entities';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  username: string;

  @Column()
  firstname: string;

  @Column()
  lastname: string;

  @Column()
  email: string;

  @Column({ type: 'enum', enum: Role, default: Role.STUDENT })
  role: Role;
  @Column()
  password: string;

  @Column({ nullable: true })
  profile_pic: string;

  @Column()
  created_at: Date;

 @Column({nullable:true})
  updated_at: Date;

  @OneToMany((_type) => Borrowers, (borrower) => borrower.user, { eager: true })
  borrower: Borrowers[];

  @OneToMany((_type) => Borrowers, (borrower) => borrower.user, { eager: true })
  issues: Borrowers[];

  @OneToMany(() => WishList, (wishlist) => wishlist.user)
  wishlists: WishList[];

  @OneToMany(() => Rating, (rating) => rating.user)
  ratings: Rating[];
}
