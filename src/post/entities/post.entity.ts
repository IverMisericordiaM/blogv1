import { Categoria } from '../../categoria/entities/categoria.entity';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'publicaciones' })
export class Post {
  @PrimaryGeneratedColumn('uuid')
  IdPublicacion: string;

  @Column({
    type: 'varchar',
    length: 255,
  })
  PTitulo: string;

  @Column({
    type: 'varchar',
    length: 100,
  })
  PResumen: string;

  @Column({
    type: 'text',
  })
  PDescripcion: string;

  @Column({
    type: 'varchar',
    length: 20,
  })
  PLugar: string;

  @CreateDateColumn({
    type: 'timestamp without time zone',
    name: 'PFecha',
    default: () => 'CURRENT_TIMESTAMP',
  })
  PFecha: Date;

  @ManyToOne(() => Categoria, (categoria) => categoria.Post, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'IdCategoria' })
  categoria: Categoria;

  @BeforeInsert()
  verificarRutaInsertada() {}

  @BeforeUpdate()
  verificarRutaActualizada() {
    this.verificarRutaInsertada();
  }
}
