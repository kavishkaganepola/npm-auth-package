import { Redis } from 'ioredis';
import { DataSource } from 'typeorm';

export class Authentication {
  redisConnection(
    REDIS_HOST: string,
    REDIS_PORT: string,
    REDIS_PASSWORD: string
  ) {
    const redisClient = new Redis({
      host: REDIS_HOST,
      port: REDIS_PORT,
      password: REDIS_PASSWORD,
    });
    return redisClient;
  }

  mysqlDBConnection(
    DB_HOST: string,
    DB_PORT: number,
    DB_USERNAME: string,
    DB_PASSWORD: string,
    DB_NAME: string
  ) {
    const dbConnection = new DataSource({
      type: 'mysql',
      host: DB_HOST,
      port: DB_PORT,
      username: DB_USERNAME,
      password: DB_PASSWORD,
      database: DB_NAME,
      synchronize: true,
    });
    return dbConnection;
  }
}
