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