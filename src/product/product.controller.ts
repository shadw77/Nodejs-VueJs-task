import { FastifyRequest, FastifyReply } from "fastify";
import prisma from "utils/prisma";
import { createProductInput } from "./product.schema";
import {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from "./product.service";
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

export async function createProductHandler(
  request: FastifyRequest<{ Body: createProductInput }>,
  reply: FastifyReply
) {
  const { file } = request as CustomFastifyRequest;

  if (!file) {
    reply.status(400).send({ message: "Image file is required" });
    return;
  }

  const product = await createProduct(request.body, reply,file);
  return product;
}

export async function getProductsHandler() {
  const products = await getProducts();
  return products;
}

export async function getProductHandler(
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) {
  const productId = Number(request.params.id);
  const product = await getProductById(productId);

  if (product) {
    reply.send(product);
  } else {
    reply.status(404).send({ message: "Product not found" });
  }
}

export async function updateProductHandler(
  request: FastifyRequest<{
    Params: { id: string };
    Body: createProductInput;
  }>,
  reply: FastifyReply
) {
  const { file } = request as CustomFastifyRequest;

  if (!file) {
    reply.status(400).send({ message: "Image file is required" });
    return;
  }
  const productId = Number(request.params.id);

  const product = await updateProduct(productId, request.body,file);
  reply.send(product);
}

export async function deleteProductHandler(
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) {
  const productId = Number(request.params.id);
  await deleteProduct(productId);
  reply.status(204).send();
}
