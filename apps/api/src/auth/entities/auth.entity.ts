import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class AuthPayloadResponse {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;

  @Field({ nullable: true })
  avatar?: string;

  @Field()
  accessToken: string;
}
