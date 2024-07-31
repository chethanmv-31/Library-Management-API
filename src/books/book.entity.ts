import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BookStock } from './books.model';

@Entity()
export class Book {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  authorName: string;

  @Column()
  price: string;

  @Column()
  copies: number;

  @Column()
  stock: BookStock;

  @Column()
  topic: string;

  @Column()
  subject: string;

  @Column()
  language: string;
}
