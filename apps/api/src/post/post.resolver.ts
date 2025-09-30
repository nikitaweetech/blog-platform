import { Resolver, Query, Context, Args, Int } from '@nestjs/graphql';
import { PostService } from './post.service';
import { Post } from './entities/post.entity';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth/jwt-auth.guard';

@Resolver(() => Post)
export class PostResolver {
  constructor(private readonly postService: PostService) {}

  @Query(() => [Post], { name: 'posts' })
  //@UseGuards(JwtAuthGuard)
  findAll(
    @Context() context,
    @Args('skip', { nullable: true }) skip: number,
    @Args('take', { nullable: true }) take: number,
  ) {
    console.log(context.req.user);
    return this.postService.findAll({ skip, take });
  }

  @Query(() => Int, { name: 'postsCount' })
  async postsCount() {
    return await this.postService.postsCount();
  }
}
