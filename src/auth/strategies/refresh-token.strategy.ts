import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'jwt-refresh-token') {
  constructor() {
    super({
      // Add your refresh token strategy configuration here
      jwtFromRequest: (req) => req?.cookies?.Refresh, // Example: Extract token from cookies
      secretOrKey: process.env.JWT_REFRESH_SECRET, // Use your refresh token secret
    });
  }

  async validate(payload: any) {
    // Add your validation logic here
    return { userId: payload.sub, username: payload.username };
  }
}