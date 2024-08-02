import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { BookStock } from './books.model';
import { User } from 'src/auth/user.entity';
import { Exclude } from 'class-transformer';

@Entity()
export class Book {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  isbn_no: string;

  @Column()
  title: string;

  @Column()
  genre: string;

  @Column()
  language: string;
  
  @Column()
  authorName: string;

  @Column()
  edition: string;

  @Column()
  publisher: string;

  @Column()
  binding: string;

  @Column()
  price: string;

  @Column()
  no_of_copies: number;

  @Column()
  stock: BookStock;

  @ManyToOne((_type) => User, (user) => user.books, { eager: false })
  @Exclude({ toPlainOnly: true })
  user: User;
}
