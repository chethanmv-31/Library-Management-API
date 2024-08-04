import { Book } from 'src/books/entities/book.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { BorrowStatus } from '../dto/borrow.model';

@Entity()
export class Borrow {
  @PrimaryGeneratedColumn()
  borrow_id: number;

  @Column()
  borrow_date: Date;

  @Column({ nullable: true })
  return_date: Date;

  @Column()
  status: BorrowStatus;

  // @ManyToOne(() => Book, (book) => book.borrows)
  // book: Book;

  // @ManyToOne(() => Borrowers, (borrower) => borrower.borrows)
  // borrower: Borrowers;
}
