import { Book } from 'src/books/entities/book.entity';
import { Borrowers } from 'src/borrowers/entities/borrowers.entity';
import { PrimaryGeneratedColumn, Column, Entity, OneToMany } from 'typeorm';
import { Role } from '../roles.model';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  username: string;

  @Column()
  firstname: string;

  @Column()
  lastname: string;

  @Column()
  email: string;

  @Column({ type: 'enum', enum: Role, default: Role.STUDENT })
  role: Role;
  @Column()
  password: string;

  @OneToMany((_type) => Book, (book) => book.user)
  books: Book;

  @OneToMany((_type) => Borrowers, (borrower) => borrower.user, { eager: true })
  borrower: Borrowers[];

  @OneToMany((_type) => Borrowers, (borrower) => borrower.user, { eager: true })
  issues: Borrowers[];
}
