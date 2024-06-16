import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Logger,
} from '@nestjs/common';
import { FilmService } from './film.service';
import { CreateFilmDto } from './dto/create-film.dto';
import { UpdateFilmDto } from './dto/update-film.dto';

@Controller('film')
export class FilmController {
  constructor(private readonly filmService: FilmService) {
    this.logger = new Logger('FilmController');
  }

  private logger: Logger;

  @Post()
  create(@Body() createFilmDto: CreateFilmDto) {
    // this.logger.log(createFilmDto.title);
    return this.filmService.create(createFilmDto);
  }

  @Get()
  findAll() {
    return this.filmService.findAll();
  }

  @Get('test')
  findGreaterThan() {
    return this.filmService.findGreaterThan();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    this.logger.log(`idnya ${id}`);
    // throw new Error('Script terminated');
    return this.filmService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFilmDto: UpdateFilmDto) {
    return this.filmService.update(id, updateFilmDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    this.logger.log(`idnya ${id}`);
    return this.filmService.remove(id);
  }
}
