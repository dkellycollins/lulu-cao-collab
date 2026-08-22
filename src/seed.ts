import { DataSource } from 'typeorm';
import { createClient } from 'redis';
import { Blog } from './blog/entities/blog.entity';
import { User } from './user/entities/user.entity';
import { File } from './file/entities/file.entity';

const AppDataSource = new DataSource({
  type: 'postgres',
  // Seeding is a write operation, so this connects straight to postgres-primary,
  // the same way migrations do. No replication config needed here.
  host: process.env.DB_HOST ?? 'localhost',
  port: parseInt(process.env.DB_PORT ?? '5432', 10),
  username: process.env.DB_USERNAME ?? 'vibereads',
  password: process.env.DB_PASSWORD ?? 'vibereads',
  database: process.env.DB_DATABASE ?? 'vibereads',
  entities: [Blog, User, File],
  synchronize: false,
});

async function seed() {
  await AppDataSource.initialize();

  const userRepo = AppDataSource.getRepository(User);
  const blogRepo = AppDataSource.getRepository(Blog);

  // Clear existing data
  await blogRepo.createQueryBuilder().delete().from(Blog).execute();
  await userRepo.createQueryBuilder().delete().from(User).execute();

  const alice = userRepo.create({
    username: 'alice',
    email: 'alice@example.com',
    profilePicture: {
      providerKey: 'profiles/alice.jpg',
      filename: 'alice.jpg',
      contentType: 'image/jpeg',
      contentSize: 183421,
    },
  });

  const bob = userRepo.create({
    username: 'bob',
    email: 'bob@example.com',
    profilePicture: {
      providerKey: 'profiles/bob.png',
      filename: 'bob.png',
      contentType: 'image/png',
      contentSize: 205984,
    },
  });

  const charlie = userRepo.create({
    username: 'charlie',
    email: 'charlie@example.com',
  });

  const diana = userRepo.create({
    username: 'diana',
    email: 'diana@example.com',
    profilePicture: {
      providerKey: 'profiles/diana.webp',
      filename: 'diana.webp',
      contentType: 'image/webp',
      contentSize: 142892,
    },
  });

  await userRepo.save([alice, bob, charlie, diana]);

  const blogs = [
    {
      title: 'Getting Started with React',
      content: 'Lorem ipsum...',
      author: alice,
      coverImage: {
        providerKey: 'blogs/react-cover.jpg',
        filename: 'react-cover.jpg',
        contentType: 'image/jpeg',
        contentSize: 341225,
      },
    },
    {
      title: 'TypeScript Tips Every Developer Should Know',
      content: 'Lorem ipsum...',
      author: bob,
    },
    {
      title: 'Building Accessible React Components',
      content: 'Lorem ipsum...',
      author: alice,
      coverImage: {
        providerKey: 'blogs/accessibility.png',
        filename: 'accessibility.png',
        contentType: 'image/png',
        contentSize: 284812,
      },
    },
    {
      title: 'Optimizing Frontend Performance',
      content: 'Lorem ipsum...',
      author: charlie,
    },
    {
      title: 'Understanding CSS Grid',
      content: 'Lorem ipsum...',
      author: diana,
      coverImage: {
        providerKey: 'blogs/css-grid.jpg',
        filename: 'css-grid.jpg',
        contentType: 'image/jpeg',
        contentSize: 193552,
      },
    },
    {
      title: 'State Management in React',
      content: 'Lorem ipsum...',
      author: bob,
    },
    {
      title: 'Introducing React Server Components',
      content: 'Lorem ipsum...',
      author: alice,
    },
    {
      title: 'Writing Better Unit Tests',
      content: 'Lorem ipsum...',
      author: diana,
      coverImage: {
        providerKey: 'blogs/testing.jpg',
        filename: 'testing.jpg',
        contentType: 'image/jpeg',
        contentSize: 176431,
      },
    },
  ];

  for (const blog of blogs) {
    await blogRepo.save(blogRepo.create(blog));
  }

  // Clear any cached user rows from a previous seed run.
  const redis = createClient({
    url: process.env.REDIS_PRIMARY_URL ?? 'redis://localhost:6379',
  });
  await redis.connect();
  const staleKeys = await redis.keys('user:*');
  if (staleKeys.length) {
    await redis.del(staleKeys);
  }
  await redis.quit();

  console.log('Database seeded!');

  await AppDataSource.destroy();
}

seed().catch(console.error);