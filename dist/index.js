"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const product_schema_1 = require("./src/product/product.schema");
const category_schema_1 = require("./src/category/category.schema");
const category_route_1 = __importDefault(require("./src/category/category.route"));
const product_route_1 = __importDefault(require("./src/product/product.route"));
const cors_1 = __importDefault(require("@fastify/cors"));
const fastify_multer_1 = __importDefault(require("fastify-multer"));
const static_1 = __importDefault(require("@fastify/static"));
const path = require("path");
const server = (0, fastify_1.default)({ logger: true });
server.get("/", async (request, reply) => {
    return "data";
});
server.register(cors_1.default, { origin: "http://localhost:8080" });
// server.register(require('@fastify/multipart'));
server.register(fastify_multer_1.default.contentParser);
// const serverRoot = path.join(__dirname, 'dist');
async function main() {
    for (const schema of [...product_schema_1.productSchema, ...category_schema_1.categorySchema]) {
        server.addSchema(schema);
    }
    server.register(product_route_1.default, { prefix: "/api/products" });
    server.register(category_route_1.default, { prefix: "/api/categories" });
    server.register(static_1.default, {
        root: path.join(__dirname, "..", "uploads"),
        prefix: "/uploads",
    });
    server.log.info(path.join(__dirname, "..", "uploads"));
    try {
        await server.listen({ port: 3002 });
        console.log(`Server listening at 3002`);
    }
    catch (error) {
        console.error(error);
        process.exit(1);
    }
}
main();
