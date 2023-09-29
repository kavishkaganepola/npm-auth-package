import { Redis } from 'ioredis';

export class Authentication {
  redisConnection(
    REDIS_HOST: string,
    REDIS_PORT: string,
    REDIS_PASSWORD: string,
    access_token: string
  ) {
    const redisClient = new Redis({
      host: REDIS_HOST,
      port: REDIS_PORT,
      password: REDIS_PASSWORD,
    });
    redisClient.sadd('auth_redis_set', access_token);
    return access_token;
  }
}
