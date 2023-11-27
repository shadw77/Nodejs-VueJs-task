import prisma from "../utils/prisma";
import { createCategoryInput } from "./category.schema";


export async function createCategory(input:createCategoryInput) {
    const category = await prisma.category.create({
        data: input,
    });
    return category;
}

export function getCategories(){
    return prisma.category.findMany({
        select:{
            id:true,
            name:true,
            picture:true,
            parent_id:true,
            created_at:true,
            updated_at:true,
        }
    })
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
        parent_id:true,
        created_at: true,
        updated_at: true,
      },
    });
  }
  
export async function updateCategory(categoryId: number, input: createCategoryInput) {
return prisma.category.update({
    where: {
    id: categoryId,
    },
    data: input,
});
}

export async function deleteCategory(categoryId: number) {
return prisma.category.delete({
    where: {
    id: categoryId,
    },
});
}
