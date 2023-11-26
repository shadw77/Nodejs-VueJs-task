import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  try {
    const products_data = [
      {
        name: "IPad 10",
        picture: "https://placehold.co/200x200",
        category_id: 1,
      },
      {
        name: "IPhone 14 pro",
        picture: "https://placehold.co/200x200",
        category_id: 2,
      },
      {
        name: "Galaxy 10",
        picture: "https://placehold.co/200x200",
        category_id: 2,
      },
      {
        name: "Samsung 8",
        picture: "https://placehold.co/200x200",
        category_id: 2,
      },
      {
        name: "Nokia 4",
        picture: "https://placehold.co/200x200",
        category_id: 2,
      },
    ];

    const products_res = await prisma.product.createMany({
      data: products_data,
    });
    console.log(products_res);
    
  } catch (err) {
    console.log(err);
    
  } finally {
    async()=>{
        await prisma.$disconnect();
    }
  }
}
main();
