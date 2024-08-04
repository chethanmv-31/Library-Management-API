import { Book } from 'src/books/entities/book.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Borrowers {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  borrower_name: string;

  @Column()
  borrowed_From: Date;

  @Column()
  borrowed_TO: Date;

  @Column()
  actual_Return_Date: Date;

  @Column()
  issued_by: number;

  @ManyToOne(() => Book, (book) => book.borrowerDetails)
  @JoinColumn()
  book: Book;
}
