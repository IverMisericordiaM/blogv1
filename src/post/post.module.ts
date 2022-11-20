import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { CategoriaService } from 'src/categoria/categoria.service';
import { CategoriaModule } from '../categoria/categoria.module';

@Module({
  imports: [TypeOrmModule.forFeature([Post]), CategoriaModule],
  controllers: [PostController],
  providers: [PostService, CategoriaService],
  exports: [TypeOrmModule],
})
export class PostModule {}
