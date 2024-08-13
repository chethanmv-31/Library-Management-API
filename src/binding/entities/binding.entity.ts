import { Book } from 'src/books/entities/book.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Binding {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  binding_name: string;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;

  @OneToMany((type) => Book, (book) => book.binding)
  books: Book[];
}
