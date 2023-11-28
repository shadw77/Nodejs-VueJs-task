import { FastifyInstance, RouteHandlerMethod } from "fastify";
import {
  createCategoryHandler,
  getCategoriesHandler,
  getCategoryHandler,
  updateCategoryHandler,
  deleteCategoryHandler,
} from "./category.controller";
import { $ref } from "./category.schema";
import multer from "fastify-multer";
const upload = multer({ dest: "uploads/" });

async function categoryRoutes(server: FastifyInstance) {
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
          },
          required: ["name"],
        },
        response: {
          201: $ref("categoryResponseSchema"),
        },
      },
    },
    createCategoryHandler  as RouteHandlerMethod
  );

  server.get(
    "/",
    {
      schema: {
        response: {
          200: $ref("categorysResponseSchema"),
        },
      },
    },
    getCategoriesHandler
  );

  server.get(
    "/:id",
    { schema: { response: { 200: $ref("categoryResponseSchema") } } },
    getCategoryHandler
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
            parent_id: { type: "number" },
          },
          required: ["name", "parent_id"],
        },

        params: { id: { type: "integer" } },
        response: { 200: $ref("categoryResponseSchema") },
      },
    },
    updateCategoryHandler as RouteHandlerMethod
  );

  server.delete(
    "/:id",
    { schema: { params: { id: { type: "integer" } } } },
    deleteCategoryHandler
  );
}

export default categoryRoutes;
