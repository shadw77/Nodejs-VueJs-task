import { FastifyInstance } from "fastify";
import {
  createProductHandler,
  getProductsHandler,
  getProductHandler,
  updateProductHandler,
  deleteProductHandler,
} from "./product.controller";
import { $ref } from "./product.schema";

async function productRoutes(server: FastifyInstance) {
  server.post(
    "/",
    {
      schema: {
        body: $ref("createProductSchema"),
        response: {
          201: $ref("productResponseSchema"),
        },
      },
    },
    createProductHandler
  );

  server.get(
    "/",
    {
      schema: {
        response: {
          200: $ref("productsResponseSchema"),
        },
      },
    },
    getProductsHandler
  );

  server.get(
    "/:id",
    { schema: { response: { 200: $ref("productResponseSchema") } } },
    getProductHandler
  );

  server.put(
    "/:id",
    {
      schema: {
        params: { id: { type: "integer" } },
        body: $ref("createProductSchema"),
        response: { 200: $ref("productResponseSchema") },
      },
    },
    updateProductHandler
  );

  server.delete(
    "/:id",
    { schema: { params: { id: { type: "integer" } } } },
    deleteProductHandler
  );
}

export default productRoutes;
