export type Post = {
  id: number;
  title: string;
  slug: string;
  author: User;
  content: string;
  thumbnail: string | null;
  published: boolean;
  authorId: number;
  createdAt: Date;
  updatedAt: Date;
  tags?: Tag[];
  //   comments: Comment[];
  //   likes: Like[];
};

export type User = {
  id: number;
  name: string;
  email: string;
  bio: string | null;
  avatar: string;
  createdAt: Date;
  updatedAt: Date;
};

export type Tag = {
  id: number;
  name: string;
};

export type CommentModel={
  id: number;
  content: string;
  post: Post;
  author: User;
  createdAt: Date;
  updatedAt: string;
}