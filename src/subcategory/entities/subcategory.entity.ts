import { Category } from 'src/category/entities/category.entity';
import { Book } from 'src/books/entities/book.entity';
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity()
@Unique(['subcategory_name', 'category']) 
export class Subcategory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column() 
  subcategory_name: string;

  @Column()
  created_at: Date;

  @Column({ nullable: true })
  updated_at: Date;

  @Column()
  created_by: string;

  @Column({ nullable: true })
  updated_by: string;

  @ManyToOne(() => Category, (category) => category.subcategories)
  category: Category;

  @OneToMany(() => Book, (book) => book.subcategory)
  books: Book[];
}