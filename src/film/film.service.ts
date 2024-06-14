import { Injectable } from '@nestjs/common';
import { CreateFilmDto } from './dto/create-film.dto';
import { UpdateFilmDto } from './dto/update-film.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Film } from './entities/film.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FilmService {
  /**
   *
   */
  constructor(@InjectRepository(Film) private readonly filmRepository: Repository<Film>) {}
  create(createFilmDto: CreateFilmDto) {
    const film: Film = new Film();
    film.description = createFilmDto.description;
    film.title = createFilmDto.title;
    film.image_thumbnail = createFilmDto.image_thumbnail;
    return this.filmRepository.save(film);
  }

  findAll(): Promise<Film[]> {
    return this.filmRepository.find();
  }

  findGreaterThan() {
    return `this return greater than`;
  }

  findOne(id: number) {
    return `This action returns a #${id} film`;
  }

  update(id: number, updateFilmDto: UpdateFilmDto) {
    return `This action updates a #${id} film`;
  }

  remove(id: number) {
    return `This action removes a #${id} film`;
  }
}
