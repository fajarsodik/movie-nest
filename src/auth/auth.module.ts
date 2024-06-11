import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from 'src/user/user.module';
import { JwtStrategy } from './jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from './local.strategy';
import { AuthController } from './auth.controller';
import { RefreshTokenStrategy } from './refresh-token.strategy';

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.secret_key,
      signOptions: { expiresIn: process.env.expires_jwt },
    }),
  ],
  providers: [AuthService, JwtStrategy, LocalStrategy, RefreshTokenStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
