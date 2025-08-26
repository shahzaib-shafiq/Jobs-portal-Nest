import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import {reLoginAuthDto}  from './dto/reLogin-auth-dto'
import { LogoutAuthDto } from './dto/logout-auth-dto';
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  create(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.create(createAuthDto);
  }

  @Post('login')
  login(@Body() loginAuthDto: LoginAuthDto) {
    return this.authService.login(loginAuthDto);
  }

    @Post('logout')
  Logoout(@Body() logoutAuthDto: LogoutAuthDto) {
    return this.authService.logout(logoutAuthDto);
  }


  @Post('relogin')
  reLogin(@Body() reloginAuthDto: reLoginAuthDto) {
    return this.authService.relogin(reloginAuthDto);
  }
}
