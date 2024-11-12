import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlogsModule } from 'src/blog/blog.module';

// @Module({
//   imports: [
//     TypeOrmModule.forRoot({
//       type: 'sqlite',
//       database: 'db',
//       autoLoadEntities: true,
//       synchronize: true,
//     })
//   ],
// })

@Module({
  imports: [BlogsModule],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}
