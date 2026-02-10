import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

export interface JWTPayload {
  id: string;
}

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async createToken(id: string) {
    return this.jwtService.signAsync<JWTPayload>({ id });
  }

  async parseToken(token: string) {
    return this.jwtService.verifyAsync<JWTPayload>(token);
  }

  async comparePassword(password: string, hash: string) {
    // TODO bcrypt compare
    if (password !== hash) throw new Error('Wrong Password');

    return password === hash;
  }
}
