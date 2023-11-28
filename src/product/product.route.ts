import { FastifyInstance, RouteHandlerMethod } from "fastify";
import {
  createProductHandler,
  getProductsHandler,
  getProductHandler,
  updateProductHandler,
  deleteProductHandler,
} from "./product.controller";
import { $ref } from "./product.schema";
import multer from "fastify-multer";
const upload = multer({ dest: "uploads/" });

async function productRoutes(server: FastifyInstance) {

    server.post(
    "/",
    {
      preValidation: multer({
        limits: {
          // fileSize: 300 * 300,
        },
        storage: multer.memoryStorage(),
      }).single("picture"), 
      schema: {
        consumes: ["multipart/form-data"],
        body: {
          type: "object",
          properties: {
            name: { type: "string" },
            category_id: { type: "number" },
          },
          required: ["name", "category_id"],
        },
        response: {
          201: $ref("productResponseSchema"),
        },
      },
    },
    createProductHandler as RouteHandlerMethod
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
      preValidation: multer({
        limits: {
          // fileSize: 300 * 300,
        },
        storage: multer.memoryStorage(),
      }).single("picture"), 

      schema: {
        consumes: ["multipart/form-data"],
        body: {
          type: "object",
          properties: {
            name: { type: "string" },
            category_id: { type: "number" },
          },
          required: ["name", "category_id"],
        },

        params: { id: { type: "integer" } },
        response: { 200: $ref("productResponseSchema") },
      },
    },
    updateProductHandler as RouteHandlerMethod
  );

  server.delete(
    "/:id",
    { schema: { params: { id: { type: "integer" } } } },
    deleteProductHandler
  );
}

export default productRoutes;
