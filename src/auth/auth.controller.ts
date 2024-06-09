import { Controller, Get, Logger, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request } from 'express';
import { LocalAuthGuard } from './local-auth.guard';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';

@Controller('auth')
export class AuthController {
  /**
   *
   */
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {
    this.logger = new Logger('AuthController');
  }

  private logger: Logger;

  @Post('login')
  @UseGuards(LocalAuthGuard)
  async login(@Req() req: Request): Promise<any> {
    this.logger.log(`hasilnyaa ${req.user}}`);
    const user = req.user;
    const token = await this.authService.login(user);
    return { token };
    // return { token };
  }

  @Post('testkeun')
  log(@Req() req: Request) {
    let datanya = typeof req.user;
    this.logger.log(datanya);
    return `${req.user}`;
    // return this.userService.findOneByUsername('fajar');
  }
}
