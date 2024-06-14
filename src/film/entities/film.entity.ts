import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Film {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({ type: 'varchar', length: 30 })
  title: string;

  @Column({ type: 'varchar', length: 30 })
  description: string;

  @Column({ type: 'varchar', length: 30 })
  image_thumbnail: string;
}
