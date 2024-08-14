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
  created_at: Date;

  @Column({ nullable: true })
  updated_at: Date;

  @Column()
  created_by: string;

  @Column({ nullable: true })
  updated_by: string;

  @OneToMany((_type) => Book, (book) => book.shelf)
  books: Book;
}
