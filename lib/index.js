"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.redisConnection = void 0;
const ioredis_1 = require("ioredis");
function redisConnection(REDIS_HOST, REDIS_PORT, REDIS_PASSWORD, access_token) {
    const redisClient = new ioredis_1.Redis({
        host: REDIS_HOST,
        port: REDIS_PORT,
        password: REDIS_PASSWORD,
    });
    redisClient.sadd('auth_redis_set', access_token);
    return access_token;
}
exports.redisConnection = redisConnection;
//# sourceMappingURL=index.js.map