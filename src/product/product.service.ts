import prisma from "../utils/prisma";
import { createProductInput } from "./product.schema";
import sharp from 'sharp';
import fs from 'fs/promises';
import { FastifyRequest, FastifyReply } from 'fastify';

interface CustomFastifyRequest extends FastifyRequest {
  file: () => Promise<{ file: Buffer; filename: string }>;
}
export async function createProduct(input:createProductInput) {
  // request: CustomFastifyRequest, reply: FastifyReply,
  // const data = request.body as createProductInput;

  // // Use req.multipart to handle file uploads
  // const stream = await request.file();

  // // If a file was uploaded, process it
  // if (stream) {
  //   try {
  //     // Resize the image to 3200x3200
  //     const resizedBuffer = await sharp(stream.file)
  //       .resize(3200, 3200)
  //       .toBuffer();

  //     // Save the resized image to a specific location
  //     const picturePath = '/public/ProductImages/';
  //     const fileName = `${Date.now()}_${stream.filename}`;
  //     const pictureFullPath = `${picturePath}/${fileName}`;
  //     await fs.writeFile(pictureFullPath, resizedBuffer);

  //     // Update the 'picture' field in the 'data' object with the file path or other relevant information
  //     data.picture = pictureFullPath;

  //     // Create the product with the updated 'data' object
  //     const product = await prisma.product.create({
  //       data,
  //     });

  //     return product;
  //   } catch (error) {
  //     console.error('Error processing image:', error);
  //     reply.status(500).send({ message: 'Internal Server Error' });
  //   }
  // } else {
  //   // If no file was uploaded, handle accordingly
  //   reply.status(400).send({ message: 'Picture is required' });
  // }  
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
