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
import multer from "fastify-multer";
import sharp from "sharp";
import fs from "fs/promises";

// Define the request interface with the updated file property
interface CustomFastifyRequest extends FastifyRequest {
  file: { buffer: Buffer; name: string };
}

// Define the multer storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Specify the folder where the images will be saved
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Use the original filename for the saved image
  },
});
const upload = multer({ storage: storage });

export async function createCategoryHandler(
  request: FastifyRequest<{
    Body: createCategoryInput;
  }>,
  reply: FastifyReply
) {
  const { file } = request as CustomFastifyRequest;

  if (!file) {
    reply.status(400).send({ message: "Image file is required" });
    return;
  }

  const category = await createCategory(request.body, reply,file);
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
  const { file } = request as CustomFastifyRequest;

  if (!file) {
    reply.status(400).send({ message: "Image file is required" });
    return;
  }

  const categoryId = Number(request.params.id);

  const categoy = await updateCategory(categoryId, request.body,file);
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
