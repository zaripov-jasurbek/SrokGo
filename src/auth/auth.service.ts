import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { NodeEnvironment, TConfig } from '../common/config/schema';
import { compare, hash } from 'bcrypt';
import type { Response } from 'express';

export interface JWTPayload {
  id: string;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly config: ConfigService<TConfig>,
  ) {}

  async createToken(id: string) {
    return {
      accessToken: await this.jwtService.signAsync<JWTPayload>({ id }),
      refreshToken: await this.jwtService.signAsync<JWTPayload>(
        { id },
        {
          expiresIn: this.config.get('JWT_EXPIRE_REFRESH_TOKEN'),
          secret: this.config.get('JWT_SECRET_REFRESH_TOKEN'),
        },
      ),
    };
  }

  async parseToken(token: string) {
    return this.jwtService.verifyAsync<JWTPayload>(token, {
      secret: this.config.get('JWT_SECRET'),
    });
  }

  async parseRefreshToken(token: string) {
    return this.jwtService.verifyAsync<JWTPayload>(token, {
      secret: this.config.get('JWT_SECRET_REFRESH_TOKEN'),
    });
  }

  generatePasswordHash(password: string) {
    const passwordWithSalt = password + this.config.get('PASSWORD_SALT');
    if (passwordWithSalt.length < 20) throw new Error('Password so longer');

    return hash(passwordWithSalt, 12);
  }

  comparePassword(password: string, hash: string) {
    const passwordWithSalt = password + this.config.get('PASSWORD_SALT');

    return compare(passwordWithSalt, hash);
  }

  setCookieRefreshToken(res: Response, refreshToken: string, path: string) {
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: this.config.get('NODE_ENV') === NodeEnvironment.Production,
      sameSite: 'strict',
      maxAge: this.config.get('JWT_EXPIRE_REFRESH_TOKEN'),
      path,
    });
  }
}
