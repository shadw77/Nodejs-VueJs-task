import prisma from "../utils/prisma";
import { createCategoryInput } from "./category.schema";
import sharp from "sharp";
import fs from "fs/promises";
import { FastifyRequest, FastifyReply } from "fastify";

interface CustomFastifyRequest extends FastifyRequest {
  file: () => Promise<{ file: Buffer; name: string }>;
}

async function saveImage(file: any) {
  const { buffer, originalname } = file;
  const filePath = `uploads/${originalname}`;

  try {
    // Resize the image using Sharp
    const resizedBuffer = await sharp(buffer)
      .resize({ width: 3200, height: 3200, fit: "inside" })
      .toBuffer();

    // Save the resized image
    await fs.writeFile(filePath, resizedBuffer);

    return filePath;
  } catch (error) {
    console.error("Error resizing or saving image:", error);
    throw error;
  }
}

export async function createCategory(
  input: createCategoryInput,
  reply: FastifyReply,
  file: any
) {
  const filePath = await saveImage(file);

  const category = await prisma.category.create({
    data: {
      name: input.name,
      parent_id: input.parent_id,
      picture: filePath,
    },
  });
  return category;
}

export function getCategories() {
  return prisma.category.findMany({
    select: {
      id: true,
      name: true,
      picture: true,
      parent_id: true,
      created_at: true,
      updated_at: true,
    },
  });
}

export async function getCategoryById(categoryId: number) {
  return prisma.category.findUnique({
    where: {
      id: categoryId,
    },
    select: {
      id: true,
      name: true,
      picture: true,
      parent_id: true,
      created_at: true,
      updated_at: true,
    },
  });
}

export async function updateCategory(
  categoryId: number,
  input: createCategoryInput,
  file: any
) {
  const filePath = await saveImage(file);

  const category = await prisma.category.update({
    where: {
      id: categoryId,
    },
    data: {
      name: input.name,
      parent_id: input.parent_id,
      picture: filePath,
    },
  });
  return category;
}

export async function deleteCategory(categoryId: number) {
  return prisma.category.delete({
    where: {
      id: categoryId,
    },
  });
}
