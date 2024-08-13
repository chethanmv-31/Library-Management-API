import { User } from 'src/auth/entities/user.entity';
import { Book } from 'src/books/entities/book.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Rating {
  @PrimaryGeneratedColumn('rowid')
  id: number;

  @Column({ type: 'float' })
  rating: number;

  @Column()
  created_at: Date;

  @ManyToOne(() => User, (user) => user.ratings)
  user: User;

  @ManyToOne(() => Book, (book) => book.ratings)
  book: Book;
}
