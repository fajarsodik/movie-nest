import { Controller, Get, Post, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './local-auth.guard';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  /**
   *
   */
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(username: string, password: string): Promise<any> {
    return 'testkan';
  }
}
