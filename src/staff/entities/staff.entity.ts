import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';

@Entity()
export class Staff {
  @PrimaryGeneratedColumn('rowid')
  id: number;

  @Column()
  staff_name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  is_admin: boolean;

  @Column()
  role: string;
}
