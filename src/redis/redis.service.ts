import { Injectable, OnModuleInit, OnModuleDestroy, Logger } from '@nestjs/common';
import { createClient, RedisClientType } from 'redis';

@Injectable()
export class RedisService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(RedisService.name);

  private writeClient: RedisClientType;
  private readClient: RedisClientType;

  async onModuleInit() {
    // redis-primary: the only instance that accepts writes. Redis replicas run
    // read-only by default, so .set()/.del() must always go through this client.
    this.writeClient = createClient({
      url: process.env.REDIS_PRIMARY_URL ?? 'redis://redis-primary:6379',
    });

    // redis-replica: cache reads go here first to keep load off the primary.
    this.readClient = createClient({
      url: process.env.REDIS_REPLICA_URL ?? 'redis://redis-replica:6379',
    });

    this.writeClient.on('error', (err) => this.logger.error('Redis primary error', err));
    this.readClient.on('error', (err) => this.logger.error('Redis replica error', err));

    await Promise.all([this.writeClient.connect(), this.readClient.connect()]);
  }

  async onModuleDestroy() {
    await Promise.all([this.writeClient?.quit(), this.readClient?.quit()]);
  }

  /** Use for every .set()/.del()/.expire() — anything that mutates cache state. */
  get write() {
    return this.writeClient;
  }

  /** Use for cache lookups. Falls back to the write client's data once replication catches up. */
  get read() {
    return this.readClient;
  }
}