import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType() // 👈 This tells GraphQL to expose this class as a schema type
export class Post {
  @Field(() => Int) // 👈 This tells GraphQL to expose this field as an integer
  id: number;

  @Field({ nullable: true })
  slug?: string;

  @Field()
  title: string;

  @Field()
  content: string;

  @Field({ nullable: true })
  thumbnail?: string;

  @Field(() => Boolean)
  published: boolean;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
