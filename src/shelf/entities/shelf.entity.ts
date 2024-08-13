import { Book } from 'src/books/entities/book.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Shelf {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  Floor_No: number;

  @Column()
  Shelf_No: number;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;

  @OneToMany((_type) => Book, (book) => book.shelf)
  books: Book;
}
