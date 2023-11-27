import { PrismaClient } from '@prisma/client'
import fastify, { FastifyInstance } from 'fastify'
import { productSchema } from './src/product/product.schema';
import { categorySchema } from './src/category/category.schema';
import categoryRoutes from './src/category/category.route';
import productRoutes from './src/product/product.route';
const server:FastifyInstance = fastify({logger:true})


const prisma = new PrismaClient();

server.get('/', async (request, res) => {
  // const allProducts = await prisma.product.findMany();
  // res.json(allProducts);
  return 'ppppp';
})

server.listen({ port: 3002 }, (err, address) => {
  if (err) {
    server.log.error(err)
    process.exit(1)
  }
  server.log.info(`Server listening at ${address}`)
})

async function main() {
  for(const schema of [...productSchema, ...categorySchema]){
    server.addSchema(schema);
  }
  server.register(productRoutes, {prefix: "api/products"});
  server.register(categoryRoutes, {prefix: "api/categories"});
 
  try{
    await server.listen({ port: 3002 });
    console.log(`Server listening at 3002`);

  }
  catch(e){
    console.log(e);
    
  }
}
main();