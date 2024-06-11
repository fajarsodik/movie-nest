import { Injectable, Logger } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { AuthService } from './auth.service';
import 'dotenv/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.secret_key,
    });
    this.logger = new Logger('JwtStrategy');
  }

  private logger: Logger;

  async validate(payload: any) {
    let datanya = typeof payload;
    this.logger.log(`tipe : ${datanya} ${payload.username}`);
    console.log('joskaannnnn');
    return { payload };
  }
}
