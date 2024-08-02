import { Book } from 'src/books/book.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Author {
  @PrimaryGeneratedColumn('rowid')
  author_Id: number;

  @Column({ unique: true })
  author_Name: string;

  
}
