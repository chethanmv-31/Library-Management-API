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
  created_at: Date;

  @Column({ nullable: true })
  updated_at: Date;

  @Column()
  created_by: string;

  @Column({ nullable: true })
  updated_by: string;

  @OneToMany((type) => Book, (book) => book.binding)
  books: Book[];
}
