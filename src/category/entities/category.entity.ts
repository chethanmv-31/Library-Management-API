import { Book } from 'src/books/entities/book.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  category_name: string;

  @Column()
  created_at: Date;

 @Column({nullable:true})
  updated_at: Date;

  @Column()
  created_by: string;

 @Column({nullable:true})
  updated_by: string;

  @OneToMany((_type) => Book, (book) => book.category)
  books: Book[];
}
