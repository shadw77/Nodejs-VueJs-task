import prisma from "../utils/prisma";
import { createProductInput } from "./product.schema";





export async function createProduct(input:createProductInput) {
    const product = await prisma.product.create({
        data: input,
    });
    return product;
}

export function getProducts(){
    return prisma.product.findMany({
        select:{
            id:true,
            name:true,
            picture:true,
            category_id:true,
            created_at:true,
            updated_at:true,
            category:{
                select:{
                    name:true
                }
            }
        }
    })
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
  
export async function updateProduct(productId: number, input: createProductInput) {
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
