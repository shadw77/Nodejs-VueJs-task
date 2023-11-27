import { FastifyInstance } from "fastify";
import {
  createCategoryHandler,
  getCategoriesHandler,
  getCategoryHandler,
  updateCategoryHandler,
  deleteCategoryHandler,
} from "./category.controller";
import { $ref } from "./category.schema";

async function categoryRoutes(server: FastifyInstance) {
  server.post(
    "/",
    {
      schema: {
        body: $ref("createCategorySchema"),
        response: {
          201: $ref("categoryResponseSchema"),
        },
      },
    },
    createCategoryHandler
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
      schema: {
        params: { id: { type: "integer" } },
        body: $ref("createCategorySchema"),
        response: { 200: $ref("categoryResponseSchema") },
      },
    },
    updateCategoryHandler
  );

  server.delete(
    "/:id",
    { schema: { params: { id: { type: "integer" } } } },
    deleteCategoryHandler
  );
}

export default categoryRoutes;
