import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  try {

    const product_res = await prisma.product.delete({
      where: {
        id: 2,
      },
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
