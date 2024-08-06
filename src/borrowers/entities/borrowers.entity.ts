import { Book } from 'src/books/entities/book.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BorrowerStatus } from '../dto/status.model';
import { User } from 'src/auth/entities/user.entity';
import { Exclude } from 'class-transformer';

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
  status: BorrowerStatus;

  @Column({ nullable: true })
  issued_by: number;

  @ManyToOne(() => Book, (book) => book.borrowerDetails)
  @JoinColumn()
  book: Book;

  @ManyToOne((_type) => User, (user) => user.borrower, { eager: false })
  @Exclude({ toPlainOnly: true })
  user: User;
}
