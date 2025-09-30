import { Injectable } from '@nestjs/common';
import { DEFAULT_PAGE_SIZE } from 'src/constants';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PostService {
  constructor(private prisma: PrismaService) {}
  async findAll({
    skip,
    take = DEFAULT_PAGE_SIZE,
  }: {
    skip?: number;
    take?: number;
  }) {
    return await this.prisma.post.findMany({ skip, take });
  }

  async postsCount() {
    return await this.prisma.post.count();
  }
}
