import { NestFactory } from '@nestjs/core';
import { DataSource } from 'typeorm';
import { AppModule } from './app/app.module';

/**
 * Exports the DataSource instance from the Nest app. This is used by the typeorm cli, generally to generate migrations.
 */

async function buildDataSource() {
  const app = await NestFactory.create(AppModule, { logger: false });
  const dataSource = app.get(DataSource);

  // Nest automatically initializes the data source. Destroy the connection before passing it to the CLI.
  await dataSource.destroy();

  return dataSource;
}

export default buildDataSource();