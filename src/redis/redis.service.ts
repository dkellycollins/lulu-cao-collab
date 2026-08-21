import { Injectable, OnModuleInit } from '@nestjs/common';
import { createClient, RedisClientType } from 'redis';

@Injectable()
export class RedisService implements OnModuleInit {
  private client: RedisClientType;

  async onModuleInit() {
    this.client = createClient({
      url: process.env.REDIS_URL ?? 'redis://redis-primary:6379',
    });

    this.client.on('error', (err) => {
      console.error('Redis Error', err);
    });

    await this.client.connect();
  }

  get clientInstance() {
    return this.client;
  }
}