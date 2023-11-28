import prisma from "../utils/prisma";
import { createProductInput } from "./product.schema";
import sharp from "sharp";
import fs from "fs/promises";
import { FastifyRequest, FastifyReply } from "fastify";

interface CustomFastifyRequest extends FastifyRequest {
  file: () => Promise<{ file: Buffer; name: string }>;
}
// export async function createProduct(input:createProductInput) {
//     const product = await prisma.product.create({
//         data: input,
//     });
//     return product;
// }
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

export async function createProduct(
  input: createProductInput,
  reply: FastifyReply,
  file: any
) {
  const filePath = await saveImage(file);
  const product = await prisma.product.create({
    data: {
      name: input.name,
      category_id: input.category_id,
      picture: filePath,
    },
  });

  return product;
}

export function getProducts() {
  return prisma.product.findMany({
    select: {
      id: true,
      name: true,
      picture: true,
      category_id: true,
      created_at: true,
      updated_at: true,
      category: {
        select: {
          name: true,
        },
      },
    },
  });
}

export async function getProductById(productId: number) {
  return prisma.product.findUnique({
    where: {
      id: productId,
    },
    select: {
      id: true,
      name: true,
      picture: true,
      category_id: true,
      created_at: true,
      updated_at: true,
      category: {
        select: {
          name: true,
        },
      },
    },
  });
}

export async function updateProduct(
  productId: number,
  input: createProductInput
) {
  return prisma.product.update({
    where: {
      id: productId,
    },
    data: input,
  });
}

export async function deleteProduct(productId: number) {
  return prisma.product.delete({
    where: {
      id: productId,
    },
  });
}
