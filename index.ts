import { PrismaClient } from "@prisma/client";
import fastify, { FastifyInstance } from "fastify";
import { productSchema } from "./src/product/product.schema";
import { categorySchema } from "./src/category/category.schema";
import categoryRoutes from "./src/category/category.route";
import productRoutes from "./src/product/product.route";
import fastifyCors from "@fastify/cors";
import multer from "fastify-multer";
import fastifyStatic from "@fastify/static";
const path = require("path");
const server: FastifyInstance = fastify({ logger: true });

server.get("/", async (request, reply) => {
  return "data";
});
server.register(fastifyCors, { origin: "http://localhost:8080" });
// server.register(require('@fastify/multipart'));
server.register(multer.contentParser);
// const serverRoot = path.join(__dirname, 'dist');

async function main() {
  for (const schema of [...productSchema, ...categorySchema]) {
    server.addSchema(schema);
  }

  server.register(productRoutes, { prefix: "/api/products" });
  server.register(categoryRoutes, { prefix: "/api/categories" });
  server.register(fastifyStatic, {
    root: path.join(__dirname, "..", "uploads"),
    prefix: "/uploads",
  });
  server.log.info(path.join(__dirname, "..", "uploads"));
  try {
    await server.listen({ port: 3002 });
    console.log(`Server listening at 3002`);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

main();
