import { type } from "os";
import { z } from "zod";
import { buildJsonSchemas } from "fastify-zod";

//

const productInput = {
  name: z.string({
    required_error: "Name is required",
    invalid_type_error: "Name must be a string",
  }),
  picture: z.string({
    invalid_type_error: "Picture must be a string",
  }),
  category_id: z.number({
    invalid_type_error: "Category Id must be a number",
  }),
};

const productGenerated = {
  id: z.number(),
  created_at: z.string(),
  updated_at: z.string(),
};

const createProductSchema = z.object({
  ...productInput,
});
const productResponseSchema = z.object({
  ...productInput,
  ...productGenerated,
});
const productsResponseSchema = z.array(productResponseSchema);

export type createProductInput = z.infer<typeof createProductSchema>;

export const { schemas: productSchema, $ref } = buildJsonSchemas({
  createProductSchema,
  productResponseSchema,
  productsResponseSchema,
});
