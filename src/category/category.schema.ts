import { type } from "os";
import { z } from "zod";
import { buildJsonSchemas } from "fastify-zod";

//

const categoryInput = {
  name: z.string({
    required_error: "Name is required",
    invalid_type_error: "Name must be a string",
  }),
  picture: z.string({
    invalid_type_error: "Picture must be a string",
  }),
  parent_id: z.number(),
};

const categoryGenerated = {
  id: z.number(),
  created_at: z.string(),
  updated_at: z.string(),
};

const createCategorySchema = z.object({
  ...categoryInput,
});
const categoryResponseSchema = z.object({
  ...categoryInput,
  ...categoryGenerated,
});
const categorysResponseSchema = z.array(categoryResponseSchema);

export type createCategoryInput = z.infer<typeof createCategorySchema>;

export const { schemas: categorySchema, $ref } = buildJsonSchemas(
  {
    createCategorySchema,
    categoryResponseSchema,
    categorysResponseSchema,
  },
  { $id: "CategorySchema" }
);
