import { Book } from 'src/books/entities/book.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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

  // @Column()
  // book_id: string;

  // @OneToMany(() => Borrow, (borrow) => borrow.borrower)
  // borrows: Borrow[];
}
