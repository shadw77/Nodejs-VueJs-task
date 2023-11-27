import { FastifyRequest, FastifyReply } from "fastify";
import prisma from "utils/prisma";
import { createCategoryInput } from "./category.schema";
import {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
} from "./category.service";

export async function createCategoryHandler(
  request: FastifyRequest<{
    Body: createCategoryInput;
  }>,
  reply: FastifyReply
) {
  const category = await createCategory({
    ...request.body,
  });
  return category;
}

export async function getCategoriesHandler() {
  const categories = await getCategories();
  return categories;
}

export async function getCategoryHandler(
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) {
  const categoryId = Number(request.params.id);
  const category = await getCategoryById(categoryId);

  if (category) {
    reply.send(category);
  } else {
    reply.status(404).send({ message: "Category not found" });
  }
}

export async function updateCategoryHandler(
  request: FastifyRequest<{
    Params: { id: string };
    Body: createCategoryInput;
  }>,
  reply: FastifyReply
) {
  const categoryId = Number(request.params.id);

  // try {
  //     request.zod.validate(request.body, "createCategorySchema");
  // } catch (error) {
  //     reply.status(400).send(error);
  //     return;
  // }

  const categoy = await updateCategory(categoryId, request.body);
  reply.send(categoy);
}

export async function deleteCategoryHandler(
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) {
  const categoyId = Number(request.params.id);
  await deleteCategory(categoyId);
  reply.status(204).send();
}
