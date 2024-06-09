import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from './auth.service';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super();
    this.logger = new Logger();
  }

  private readonly logger: Logger;

  async validate(username: string, password: string) {
    const user = await this.authService.validateUser(username, password);
    let datanya = typeof user;
    this.logger.log(`datanya gimana ${user.name} ${datanya}`);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
