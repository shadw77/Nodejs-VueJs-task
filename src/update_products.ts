import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  try {
    const product_data = [
      {
        name: "IPad 10",
        picture: "https://placehold.co/200x200",
        category_id: 1,
      },
    ];

    const product_res = await prisma.product.update({
      where: {
        id: 2,
      },
      data: { name: "IPhone 15" },
    });
    console.log(product_res);
  } catch (err) {
    console.log(err);
  } finally {
    async () => {
      await prisma.$disconnect();
    };
  }
}
main();
