import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlogModule } from '../blog/blog.module';
import { Blog } from '../blog/entities/blog.entity';
// import { BookModule } from '../book/book.module';
// import { Book } from '../book/entities/book.entity';
import { User } from '../user/entities/user.entity';
import { UserModule } from '../user/user.module';
// import { ReviewModule } from '../review/review.module';
// import { Review } from '../review/entities/review.entity';
import { File } from '../file/entities/file.entity';
import { FileModule } from '../file/file.module';
import migrations from '../migrations';
import { RedisModule } from '../redis/redis.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({ // Integrate with database
      type: 'postgres',
      host: process.env.DB_HOST ?? 'localhost',
      port: parseInt(process.env.DB_PORT ?? '5432', 10),
      username: process.env.DB_USERNAME ?? 'vibereads',
      password: process.env.DB_PASSWORD ?? 'vibereads',
      database: process.env.DB_DATABASE ?? 'vibereads',
      entities: [Blog, User, File],
      migrations: migrations,
      migrationsRun: true,
    }),
    UserModule,
    BlogModule,
    FileModule,
    RedisModule              
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}