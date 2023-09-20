"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Authentication = void 0;
const ioredis_1 = require("ioredis");
class Authentication {
    redisConnection(REDIS_HOST, REDIS_PORT, REDIS_PASSWORD, access_token) {
        return __awaiter(this, void 0, void 0, function* () {
            const redisClient = new ioredis_1.Redis({
                host: REDIS_HOST,
                port: REDIS_PORT,
                password: REDIS_PASSWORD,
            });
            redisClient.sadd('auth_redis_set', access_token);
            return access_token;
        });
    }
}
exports.Authentication = Authentication;
//# sourceMappingURL=index.js.map