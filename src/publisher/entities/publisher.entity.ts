import { Book } from 'src/books/entities/book.entity';
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Publisher {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  publisher_name: string;

  @OneToMany((type) => Book, (book) => book.publisher)
  books: Book[];
}
