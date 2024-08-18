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
  borrowed_From: Date;

  @Column()
  borrowed_TO: Date;

  @Column({ type: 'date', nullable: true })
  actual_Return_Date: Date;

  @Column()
  status: BorrowerStatus;

  @Column({ nullable: true, type: 'decimal' })
  days_overdue: number;

  @Column({ nullable: true, type: 'int' })
  fine: number;

  @Column()
  created_at: Date;

  @Column({ nullable: true })
  updated_at: Date;

  @Column()
  created_by: string;

  @Column({ nullable: true })
  updated_by: string;

  @ManyToOne(() => Book, (book) => book.borrowerDetails)
  @JoinColumn()
  book: Book;

  @ManyToOne(() => User, (user) => user.issues)
  @JoinColumn()
  issued_by: User;

  @ManyToOne((_type) => User, (user) => user.borrower, { eager: false })
  @Exclude({ toPlainOnly: true })
  borrower: User;
}
