import { User } from 'src/auth/entities/user.entity';
import { Book } from 'src/books/entities/book.entity';
import { Borrowers } from 'src/borrowers/entities/borrowers.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class WishList {
  @PrimaryGeneratedColumn('rowid')
  Id: number;

  @ManyToOne(() => User, (user) => user.wishlists)
  @JoinColumn({ name: 'user_id' }) // Updated column name
  user: User;

  @ManyToOne(() => Book, (book) => book.wishlists)
  @JoinColumn({ name: 'book_id' }) // Updated column name
  book: Book;
}
