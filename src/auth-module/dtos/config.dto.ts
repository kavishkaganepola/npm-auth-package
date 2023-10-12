export class ConfigDto {
  DB_TYPE: string;
  DB_HOST: string;
  DB_PORT: number;
  DB_USERNAME: string;
  DB_PASSWORD: string;
  DB_NAME: string;
  DB_REGION: string;
  DB_READER_HOST: string;
  DB_WRITER_HOST: string;
  REDIS_HOST: string;
  REDIS_PORT: number;
  REDIS_PASSWORD: string;
  JWT_SECRET: string;
  JWT_EXPIRATION: number;
}
