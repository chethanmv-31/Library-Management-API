import { Book } from 'src/books/book.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Author {
  @PrimaryGeneratedColumn('rowid')
  Id: number;

  @Column({ unique: true })
  author_Name: string;

  @OneToMany((_type) => Book, (book) => book.author, {
    eager: false,
    onDelete: 'SET NULL',
  })
  books: Book;
}
