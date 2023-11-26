import { FastifyRequest, FastifyReply } from 'fastify';
import prisma from 'utils/prisma';
import { createProductInput } from './product.schema';
import { createProduct, getProducts } from './product.service';

export async function createProductHandler(
    request: FastifyRequest<{
        Body:createProductInput;
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