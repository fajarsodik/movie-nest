import { Controller, Get, Logger, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request } from 'express';
import { LocalAuthGuard } from './local-auth.guard';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
@ApiTags('auth')
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

  @ApiOperation({ summary: 'Login and get JWT' })
  @ApiResponse({ status: 200, description: 'JWT Token' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        username: { type: 'string' },
        password: { type: 'string' },
      },
    },
  })
  @Post('login')
  @UseGuards(LocalAuthGuard)
  async login(@Req() req: Request): Promise<any> {
    this.logger.log(`hasilnyaa ${req.user}}`);
    const user = req.user;
    const token = await this.authService.login(user);
    this.logger.log(`tokennya ${req.user}} ${token}`);
    return { token };
  }

  @UseGuards(JwtAuthGuard)
  @Get('testkeun')
  log() {
    return 'gaskan';
  }

  @UseGuards(AuthGuard('jwt-refresh'))
  @Post('refresh')
  async refresh(@Req() req: Request) {
    const refreshToken = req.headers.authorization.split(' ')[1];
    return this.authService.refresh(refreshToken);
  }
}
