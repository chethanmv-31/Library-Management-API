import { Book } from 'src/books/entities/book.entity';
import { Subcategory } from 'src/subcategory/entities/subcategory.entity';
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

  @OneToMany(() => Subcategory, (subcategory) => subcategory.category)
  subcategories: Subcategory[];

  @OneToMany(() => Book, (book) => book.category)
  books: Book[];
}
