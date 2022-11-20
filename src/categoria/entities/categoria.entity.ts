import { Post } from 'src/post/entities/post.entity';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'category' })
export class Categoria {
  @PrimaryGeneratedColumn('uuid')
  IdCategory: string;

  @Column({
    type: 'varchar',
    length: 100,
    unique: true,
  })
  CDescription: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  CPhoto: string;

  @CreateDateColumn({
    type: 'timestamp without time zone',
    name: 'C_creado',
    default: () => 'CURRENT_TIMESTAMP',
  })
  C_creado: Date;

  @OneToMany(
    () => Post,
    (post) => post.categoria,
    { cascade: true, eager: true },
    // { cascade: true }
  )
  Post: Post;

  @BeforeInsert()
  covertTolowerCase() {
    // this.CDescription = this.CDescription.toUpperCase().trim();
  }

  @BeforeUpdate()
  checkSlugUpdate() {
    this.covertTolowerCase();
  }
}
