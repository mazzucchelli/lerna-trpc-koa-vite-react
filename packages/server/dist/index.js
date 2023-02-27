"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const koa_1 = __importDefault(require("koa"));
const trpc_koa_adapter_1 = require("trpc-koa-adapter");
const cors_1 = __importDefault(require("@koa/cors"));
const server_1 = require("@trpc/server");
const zod_1 = require("zod");
const t = server_1.initTRPC.create();
const appRouter = t.router({
    greeting: t.procedure
        .input(zod_1.z.object({
        name: zod_1.z.string(),
    }).optional())
        .query(({ input }) => {
        var _a;
        return {
            text: `Hello ${(_a = input === null || input === void 0 ? void 0 : input.name) !== null && _a !== void 0 ? _a : "world"}`,
        };
    }),
});
const app = new koa_1.default();
app.use((0, cors_1.default)());
const adapter = (0, trpc_koa_adapter_1.createKoaMiddleware)({
    router: appRouter,
    prefix: "/trpc",
});
app.use(adapter);
app.listen(1234);
