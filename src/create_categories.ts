import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  try {
    const categories_data = [
      {
        name: "Phones",
        picture: "https://placehold.co/200x200",
        parent_id: 1
      },
      {
        name: "IPad",
        picture: "https://placehold.co/200x200",
        parent_id: 2
      },
    ];

    const categories_res = await prisma.category.createMany({
      data: categories_data,
    });
    console.log(categories_res);
    
  } catch (err) {
    console.log(err);
    
  } finally {
    async()=>{
        await prisma.$disconnect();
    }
  }
}
main();
