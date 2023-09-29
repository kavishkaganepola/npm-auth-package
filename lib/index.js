"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Authentication = void 0;
const ioredis_1 = require("ioredis");
const typeorm_1 = require("typeorm");
class Authentication {
    redisConnection(REDIS_HOST, REDIS_PORT, REDIS_PASSWORD) {
        const redisClient = new ioredis_1.Redis({
            host: REDIS_HOST,
            port: REDIS_PORT,
            password: REDIS_PASSWORD,
        });
        return redisClient;
    }
    mysqlDBConnection(DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD, DB_NAME) {
        const dbConnection = new typeorm_1.DataSource({
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
exports.Authentication = Authentication;
//# sourceMappingURL=index.js.map