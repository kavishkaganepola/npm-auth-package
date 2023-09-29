import { Redis } from 'ioredis';
import { DataSource } from 'typeorm';
export declare class Authentication {
    redisConnection(REDIS_HOST: string, REDIS_PORT: string, REDIS_PASSWORD: string): Redis;
    mysqlDBConnection(DB_HOST: string, DB_PORT: number, DB_USERNAME: string, DB_PASSWORD: string, DB_NAME: string): DataSource;
}
//# sourceMappingURL=index.d.ts.map