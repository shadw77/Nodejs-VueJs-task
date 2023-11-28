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

// const multer = require('multer');
// const upload = multer({dest:'uploads'});
async function productRoutes(server: FastifyInstance) {

  
  // server.post(
  //   "/",
  //   {
  //     preHandler: upload.single("picture"),
  //     schema: {
  //       body: $ref("createProductSchema"),
  //       response: {
  //         201: $ref("productResponseSchema"),
  //       },
  //     },
  //   },
  //   createProductHandler as RouteHandlerMethod
  // );
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
