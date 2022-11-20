import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './entities/post.entity';
import { isUUID } from 'class-validator';
import { CategoriaService } from 'src/categoria/categoria.service';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private readonly publicacionRepository: Repository<Post>,
    private readonly categoriaService: CategoriaService,
  ) {}

  async create(createPostDto: CreatePostDto) {
    const categoria = await this.categoriaService.findOne(
      createPostDto.IdCategoria,
    );

    const publicacion = this.publicacionRepository.create({
      ...createPostDto,
      categoria,
    });

    await this.publicacionRepository.save(publicacion);
    return publicacion;
  }

  async findAll() {
    const publicacion = await this.publicacionRepository.find();
    return publicacion;
  }

  async findOne(IdPublicacion: string) {
    if (!isUUID(IdPublicacion))
      throw new NotFoundException(
        `El Id ${IdPublicacion} no es un UUID valido`,
      );
    const publicacion = await this.publicacionRepository.findOneBy({
      IdPublicacion: IdPublicacion,
    });

    if (!publicacion)
      throw new NotFoundException(
        `publicacion con el id: ${IdPublicacion} no existe`,
      );

    return publicacion;
  }

  async update(IdPublicacion: string, updatePostDto: UpdatePostDto) {
    if (!isUUID(IdPublicacion))
      throw new NotFoundException(
        `El Id ${IdPublicacion} no es un UUID valido`,
      );

    const publicacion = await this.publicacionRepository.preload({
      IdPublicacion,
      ...updatePostDto,
    });

    if (!publicacion)
      throw new NotFoundException(
        `publicacion con el id: ${IdPublicacion} no existe`,
      );

    await this.publicacionRepository.save(publicacion);

    return publicacion;
  }

  async remove(IdPublicacion: string) {
    const publicacion = await this.findOne(IdPublicacion);
    await this.publicacionRepository.remove(publicacion);
    return `Publicacion ${publicacion} eliminada`;
  }
}
