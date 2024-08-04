import { Book } from 'src/books/entities/book.entity';
import { Borrow } from 'src/borrow/entities/borrow.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

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

  
  @OneToMany(() => Borrow, (borrow) => borrow.borrower)
  borrows: Borrow[];
}
