import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { User } from './user/entities/user.entity';
import { FilmModule } from './film/film.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { Film } from './film/entities/film.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      password: 'H3v@h4ha',
      username: 'postgres',
      entities: [User, Film],
      database: 'fullstackfilm',
      synchronize: true,
      logging: true,
    }),
    ConfigModule.forRoot({}),
    UserModule,
    FilmModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
