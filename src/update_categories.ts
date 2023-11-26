import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  try {
    const category_data = [
      {
        name: "IPad",
        picture: "https://placehold.co/200x200",
        category_id: 1,
      },
    ];

    const category_res = await prisma.category.update({
      where: {
        id: 2,
      },
      data: { name: "IPad & Tablet" },
    });
    console.log(category_res);
  } catch (err) {
    console.log(err);
  } finally {
    async () => {
      await prisma.$disconnect();
    };
  }
}
main();
