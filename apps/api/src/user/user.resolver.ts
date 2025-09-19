import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}
  @Mutation(() => User, { nullable: true })
  async createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    try {
      return await this.userService.create(createUserInput);
    } catch (err) {
      console.log(err);
      return null;
    }
  }
}
