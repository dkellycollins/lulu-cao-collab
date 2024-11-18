import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlogsModule } from 'src/blog/blog.module';
import { Blog } from 'src/blog/entities/blog.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({ // Integrate with database
      type: 'sqlite',
      database: 'db',
      entities: [Blog],
      synchronize: true,
    }),
    BlogsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}