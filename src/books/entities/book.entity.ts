import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BookStock } from '../books.model';
import { User } from 'src/auth/entities/user.entity';
import { Exclude } from 'class-transformer';
import { Author } from 'src/author/entities/author.entity';
import { Binding } from 'src/binding/entities/binding.entity';
import { Category } from 'src/category/entities/category.entity';

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
  publisher: string;

  @Column()
  price: string;

  @Column()
  no_of_copies: number;

  @Column()
  stock: BookStock;

  @ManyToOne((_type) => User, (user) => user.books, { eager: false })
  @Exclude({ toPlainOnly: true })
  user: User;

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

  @ManyToOne((_type) => Category, (category) => category.books, {
    eager: false,
    cascade: true,
    onDelete: 'SET NULL',
  })
  category: Category;

  // @OneToMany(() => Borrow, (borrow) => borrow.book)
  // borrows: Borrow[];
}
