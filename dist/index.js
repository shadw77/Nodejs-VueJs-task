"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const fastify_1 = __importDefault(require("fastify"));
const product_schema_1 = require("./src/product/product.schema");
const product_route_1 = __importDefault(require("./src/product/product.route"));
const server = (0, fastify_1.default)({ logger: true });
const prisma = new client_1.PrismaClient();
server.get('/', async (request, res) => {
    // const allProducts = await prisma.product.findMany();
    // res.json(allProducts);
    return 'ppppp';
});
server.listen({ port: 3002 }, (err, address) => {
    if (err) {
        server.log.error(err);
        process.exit(1);
    }
    server.log.info(`Server listening at ${address}`);
});
async function main() {
    server.register(product_route_1.default, { prefix: "api/products" });
    for (const schema of [...product_schema_1.productSchema]) {
        server.addSchema(schema);
    }
    try {
        await server.listen({ port: 3002 });
        console.log(`Server listening at 3002`);
    }
    catch (e) {
        console.log(e);
    }
}
main();
