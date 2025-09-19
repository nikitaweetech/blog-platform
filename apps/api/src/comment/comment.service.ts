import { Injectable } from '@nestjs/common';

@Injectable()
export class CommentService {
  findAll() {
    return `This action returns all comment`;
  }
}
