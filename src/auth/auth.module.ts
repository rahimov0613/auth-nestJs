import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/user.entity';
import { UsersService } from '../users/user.service';
import { JwtStrategy } from './strategies/access-token.strategy'
import { JwtRefreshStrategy } from './strategies/refresh-token.strategy'; // Ensure this file exists or create it

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({}), // bo‘sh, chunki custom config .env orqali
  ],
  controllers: [AuthController],
  providers: [AuthService, UsersService, JwtStrategy, JwtRefreshStrategy],
})
export class AuthModule {}
