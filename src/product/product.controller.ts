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

export async function createProductHandler(
  request: FastifyRequest<{
    Body: createProductInput;
  }>,
  reply: FastifyReply
) {
  const product = await createProduct({
    ...request.body,
  });
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
  const productId = Number(request.params.id);

  // try {
  //     request.zod.validate(request.body, "createProductSchema");
  // } catch (error) {
  //     reply.status(400).send(error);
  //     return;
  // }

  const product = await updateProduct(productId, request.body);
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
