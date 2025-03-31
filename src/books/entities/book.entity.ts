import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BookStock } from '../dto/books.model';

import { Author } from 'src/author/entities/author.entity';
import { Binding } from 'src/binding/entities/binding.entity';
import { Category } from 'src/category/entities/category.entity';
import { Borrowers } from 'src/borrowers/entities/borrowers.entity';
import { Shelf } from 'src/shelf/entities/shelf.entity';
import { WishList } from 'src/whishlist/entities/wishlist.entity';
import { Publisher } from 'src/publisher/entities/publisher.entity';
import { Rating } from 'src/ratings/entities/rating.entities';
import { Subcategory } from 'src/subcategory/entities/subcategory.entity';

@Entity()
export class Book {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  isbn_no: string;

  @Column()
  title: string;

  @Column({ nullable: true })
  image: string; // This field stores the path to the uploaded image

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

  @Column()
  created_at: Date;

 @Column({nullable:true})
  updated_at: Date;

  @Column({nullable:true})
  created_by: string;

  @Column({nullable:true})
  updated_by: string;

  @OneToMany(() => WishList, (wishlist) => wishlist.book)
  wishlists: WishList[];

  @OneToMany(() => Rating, (rating) => rating.book)
  ratings: Rating[];

  @ManyToOne(() => Subcategory, (subcategory) => subcategory.books)
  subcategory: Subcategory;
}
