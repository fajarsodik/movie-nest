import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Logger } from '@nestjs/common';
import { User } from 'src/user/entities/user.entity';
import { LoginDto } from './dto/login.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  /**
   * auth with JWT
   */
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {
    this.logger = new Logger('AuthService');
  }

  private readonly logger: Logger;

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userService.findOneByUsername(username);
    this.logger.log(`apa nih ${user.email}`);
    console.log('jos');
    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user;
      this.logger.log(`apa nih ${user.name}`);
      // throw new Error('Script terminated');
      return result;
    }
    return null;
  }

  async login(user: any): Promise<{ accessToken: string }> {
    this.logger.log(`payloadnya gannn ${user}`);
    const payload = { username: user.username, sub: user.id };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
