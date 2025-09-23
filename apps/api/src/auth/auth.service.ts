import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { verify } from 'argon2';
import { SignInInput } from './dto/sign-in.input';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/entities/user.entity';
import { AuthPayload } from './types/jwt-payload.types';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}
  async validateLocalUser({ email, password }: SignInInput) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) {
      throw new UnauthorizedException('User not exist!');
    }
    const passwordMatched = await verify(user.password, password);
    if (!passwordMatched) {
      throw new UnauthorizedException('Invalid Credentials');
    }
    return user;
  }

  async generateToken(userId: number) {
    const payload: AuthPayload = { sub: userId };
    const accessToken = await this.jwtService.signAsync(payload);
    return accessToken;
  }

  async login(user: User) {
    const accessToken = await this.generateToken(user.id);
    return {
      id: user.id,
      name: user.name,
      avatar: user.avatar,
      accessToken,
    };
  }
}
