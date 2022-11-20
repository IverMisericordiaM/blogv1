import { Module } from '@nestjs/common';
import { CategoriaService } from './categoria.service';
import { CategoriaController } from './categoria.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { Categoria } from './entities/categoria.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Categoria]), ConfigModule],
  controllers: [CategoriaController],
  providers: [CategoriaService],
  exports: [TypeOrmModule],
})
export class CategoriaModule {}
