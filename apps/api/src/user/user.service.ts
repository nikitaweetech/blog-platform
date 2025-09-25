import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import * as argon2 from 'argon2';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserInput: CreateUserInput) {
    const { password, email, ...user } = createUserInput;
    const existingEmail = await this.prisma.user.findUnique({
      where: { email },
    });
    if (existingEmail) {
      throw new Error('Email already exist');
    }

    const hashedPassword = await argon2.hash(password);
    return await this.prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        ...user,
      },
    });
  }
}
