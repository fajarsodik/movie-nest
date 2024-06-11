import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Logger } from '@nestjs/common';

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
      this.logger.log(`apa nih ${user.name} ${result}`);
      // throw new Error('Script terminated');
      return result;
    }
    return null;
  }

  async login(
    user: any,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    this.logger.log(`payloadnya gannn ${user}`);
    const payload = { username: user.username, sub: user.id };
    return {
      accessToken: this.jwtService.sign(payload),
      refreshToken: this.jwtService.sign(payload, {
        secret: process.env.refresh_token,
        expiresIn: '7d',
        algorithm: 'HS256',
      }),
    };
  }

  async refresh(token: string) {
    const decoded = this.jwtService.verify(token, {
      secret: process.env.refresh_token,
    });
    const payload = { username: decoded.username, sub: decoded.sub };
    const newAccessToken = this.jwtService.sign(payload, {
      secret: process.env.secret_key,
      expiresIn: '15m',
    });
    return { accessToken: newAccessToken };
  }
}
