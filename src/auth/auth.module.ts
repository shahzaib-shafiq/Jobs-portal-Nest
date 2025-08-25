import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from '../../prisma/prisma.module';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
@Module({
  imports:[PrismaModule,
    PassportModule,
    JwtModule.register({
      global: true, // makes JwtService available app-wide
      secret: process.env.JWT_ACCESS_SECRET || 'default_secret',
      signOptions: { expiresIn: '15m' },
    })],
  controllers: [AuthController],
  providers: [AuthService,JwtStrategy],
   exports: [AuthService,JwtModule],
})
export class AuthModule {}
