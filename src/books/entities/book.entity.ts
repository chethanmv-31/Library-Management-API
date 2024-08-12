import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BookStock } from '../dto/books.model';
import { User } from 'src/auth/entities/user.entity';
import { Exclude } from 'class-transformer';
import { Author } from 'src/author/entities/author.entity';
import { Binding } from 'src/binding/entities/binding.entity';
import { Category } from 'src/category/entities/category.entity';
import { Borrowers } from 'src/borrowers/entities/borrowers.entity';
import { Shelf } from 'src/shelf/entities/shelf.entity';
import { WishList } from 'src/whishlist/entities/wishlist.entity';
import { Publisher } from 'src/publisher/entities/publisher.entity';
import { Rating } from 'src/ratings/entities/rating.entities';

@Entity()
export class Book {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  isbn_no: string;

  @Column()
  title: string;

  @Column()
  language: string;

  @Column()
  edition: string;

  @Column()
  price: string;

  @Column()
  no_of_copies: number;

  @Column()
  stock: BookStock;


  @ManyToOne((_type) => Author, (author) => author.books, {
    eager: false,
    cascade: true,
    onDelete: 'SET NULL',
  })
  author: Author;

  @ManyToOne((_type) => Binding, (binding) => binding.books, {
    eager: false,
    cascade: true,
    onDelete: 'SET NULL',
  })
  binding: Binding;

  @ManyToOne((_type) => Publisher, (publisher) => publisher.books, {
    eager: false,
    cascade: true,
    onDelete: 'SET NULL',
  })
  publisher: Publisher;

  @ManyToOne((_type) => Category, (category) => category.books, {
    eager: false,
    cascade: true,
    onDelete: 'SET NULL',
  })
  category: Category;

  @OneToMany((_type) => Borrowers, (borrowerDetails) => borrowerDetails.book, {
    eager: false,
    cascade: true,
    onDelete: 'SET NULL',
  })
  borrowerDetails: Borrowers[];

  @ManyToOne((_type) => Shelf, (shelf) => shelf.books, {
    eager: false,
    cascade: true,
    onDelete: 'SET NULL',
  })
  shelf: Shelf;

  @OneToMany(() => WishList, (wishlist) => wishlist.book)
  wishlists: WishList[];
  
  @OneToMany(() => Rating, rating => rating.book)
  ratings: Rating[];
}
