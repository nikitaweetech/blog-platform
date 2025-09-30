import { faker } from '@faker-js/faker';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
function generateSlug(title: string): string {
  return title
    .toLocaleLowerCase()
    .trim()
    .replace(/ /g, '-')
    .replace(/[\*-]+/g, '');
}

async function main() {
  const users = Array.from({ length: 10 }).map(() => ({
    name: faker.person.fullName(),
    email: faker.internet.email(),
    bio: faker.lorem.sentence(),
    avatar: faker.image.avatar(),
  }));
  await prisma.user.createMany({
    data: users,
  });

  const posts = Array.from({ length: 400 }).map((_, i) => {
    const title = faker.lorem.sentence();
    return {
      title,
      slug: generateSlug(title),
      content: faker.lorem.paragraphs(3),
      thumbnail: `https://picsum.photos/seed/post${i}/600/400`, // Stable & always works
      authorId: faker.number.int({ min: 1, max: 10 }),
      published: true,
    };
  });


  await Promise.all(
    posts.map(
      async (post) =>
        await prisma.post.create({
          data: {
            ...post,
            comments: {
              createMany: {
                data: Array.from({ length: 20 }).map(() => ({
                  content: faker.lorem.sentence(),
                  authorId: faker.number.int({ min: 1, max: 10 }),
                })),
              },
            },
          },
        }),
    ),
  );

  console.log('Seeding completed');
}
main()
  .then(() => {
    prisma.$disconnect();
    process.exit(0);
  })
  .catch((error) => {
    prisma.$disconnect();
    console.error(error);
    process.exit(1);
  });
