import {
    Controller,
    Post,
    Body,
    UseGuards,
    Req,
  } from '@nestjs/common';
  import { AuthService } from './auth.service';
  import { RegisterDto } from './dto/register.dto';
  import { LoginDto } from './dto/login.dto';
  import { JwtAuthGuard } from './guards/jwt-auth.guard';
  import { Request } from 'express';
  
  @Controller('auth')
  export class AuthController {
    constructor(private authService: AuthService) {}
  
    @Post('register')
    register(@Body() dto: RegisterDto) {
      return this.authService.register(dto);
    }
  
    @Post('login')
    login(@Body() dto: LoginDto) {
      return this.authService.login(dto);
    }
  
    @Post('refresh')
    refresh(@Req() req: Request) {
      const authHeader = req.headers['authorization'];
      const token = authHeader && authHeader.split(' ')[1];
      if (!token) {
        throw new Error('Token is missing or invalid');
      }
      const decoded: any = this.authService['jwtService'].decode(token);
      return this.authService.refresh(decoded.sub, token);
    }
  
    @UseGuards(JwtAuthGuard)
    @Post('logout')
    logout(@Req() req: any) {
      return this.authService.logout(req.user.sub);
    }
  }