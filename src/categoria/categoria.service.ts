import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Categoria } from './entities/categoria.entity';
import { Repository } from 'typeorm';
import { isUUID } from 'class-validator';

@Injectable()
export class CategoriaService {
  constructor(
    @InjectRepository(Categoria)
    private readonly categoryRepository: Repository<Categoria>,
  ) {}

  async create(createCategoriaDto: CreateCategoriaDto) {
    const category = this.categoryRepository.create({
      ...createCategoriaDto,
    });
    await this.categoryRepository.save(category);
    return category;
  }

  async findAll() {
    const category = await this.categoryRepository.find();
    return category;
  }

  async findOne(IdCategory: string) {
    if (!isUUID(IdCategory))
      throw new NotFoundException(`El Id ${IdCategory} no es un UUID valido`);
    const category = await this.categoryRepository.findOneBy({
      IdCategory: IdCategory,
    });

    if (!category)
      throw new NotFoundException(`country con el id: ${IdCategory} no existe`);

    return category;
  }

  async update(IdCategory: string, updateCategoriaDto: UpdateCategoriaDto) {
    if (!isUUID(IdCategory))
      throw new NotFoundException(`El Id ${IdCategory} no es un UUID valido`);

    const category = await this.categoryRepository.preload({
      IdCategory,
      ...updateCategoriaDto,
    });

    if (!category)
      throw new NotFoundException(
        `categoria con el id: ${IdCategory} no existe`,
      );

    await this.categoryRepository.save(category);

    return category;
  }

  async remove(IdCategory: string) {
    const category = await this.findOne(IdCategory);
    await this.categoryRepository.remove(category);
    return `Categoria ${category} eliminada`;
  }
}
