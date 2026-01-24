import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  async createToken(id: string) {
    return ''; //TODO JWT token
  }

  async parseToken(token: string) {
    return { id: token }; // TODO parse JWT token
  }

  async comparePassword(password: string, hash: string) {
    // TODO bcrypt compare
    if (password !== hash) throw new Error('Wrong Password');

    return password === hash;
  }
}
