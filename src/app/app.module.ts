import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlogModule } from 'src/blog/blog.module';
import { Blog } from 'src/blog/entities/blog.entity';
// import { BookModule } from 'src/book/book.module';
// import { Book } from 'src/book/entities/book.entity';
import { User } from 'src/user/entities/user.entity';
import { UserModule } from 'src/user/user.module';
// import { ReviewModule } from 'src/review/review.module';
// import { Review } from 'src/review/entities/review.entity';
import { File } from 'src/file/entities/file.entity';
import { FileModule } from 'src/file/file.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({ // Integrate with database
      type: 'sqlite',
      database: 'db',
      entities: [Blog, User, File],
      synchronize: true,
    }),
    UserModule,
    BlogModule,
    FileModule,              
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}