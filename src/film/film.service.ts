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
  constructor(
    @InjectRepository(Film) private readonly filmRepository: Repository<Film>,
  ) {}
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

  findOne(id: string) {
    return this.filmRepository.findOneBy({ id });
  }

  update(id: string, updateFilmDto: UpdateFilmDto) {
    const film: Film = new Film();
    film.title = updateFilmDto.title;
    film.description = updateFilmDto.description;
    film.image_thumbnail = updateFilmDto.image_thumbnail;
    film.id = id;
    return this.filmRepository.save(film);
  }

  remove(id: string): Promise<{ affected?: number }> {
    return this.filmRepository.delete(id);
  }
}
