import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  getHello(): string {
    return 'Hello World!';
  }

  async login(): Promise<string> {
    // Generate and return a JWT token
    const token = this.jwtService.sign({ username: 'john' });
    return token;
  }
}
