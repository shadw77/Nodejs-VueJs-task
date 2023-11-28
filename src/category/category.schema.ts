import { type } from "os";
import { z } from "zod";
import { buildJsonSchemas } from "fastify-zod";

//

const categoryInput = {
  name: z.string({
    required_error: "Name is required",
    invalid_type_error: "Name must be a string",
  }),
  picture: z.string(),
  parent_id: z.number()
};

const categoryGenerated = {
  id: z.number(),
  created_at: z.string(),
  updated_at: z.string(),
};
const productSchema = z.object({
  id: z.number(),
  name: z.string(),
  picture: z.string(),
  category_id: z.number(),
  created_at: z.string(),
  updated_at: z.string(),
});

const childCategorySchema = z.object({
  id: z.number(),
  name: z.string(),
});
const createCategorySchema = z.object({
  ...categoryInput,
});
const categoryResponseSchema = z.object({
  ...categoryInput,
  ...categoryGenerated,
  products: z.array(productSchema),
  ChildCategories: z.array(childCategorySchema),

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
