import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlogModule } from '../blog/blog.module';
import { Blog } from '../blog/entities/blog.entity';
// import { BookModule } from 'src/book/book.module';
// import { Book } from 'src/book/entities/book.entity';
import { User } from '../user/entities/user.entity';
import { UserModule } from '../user/user.module';
// import { ReviewModule } from 'src/review/review.module';
// import { Review } from 'src/review/entities/review.entity';
import { File } from '../file/entities/file.entity';
import { FileModule } from '../file/file.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({ // Integrate with database
      type: 'sqlite',
      database: 'db',
      entities: [Blog, User, File],
    }),
    UserModule,
    BlogModule,
    FileModule,              
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}