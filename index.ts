import { PrismaClient } from '@prisma/client'
import fastify, { FastifyInstance } from 'fastify'
import { productSchema } from './src/product/product.schema';
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
    server.register(productRoutes, {prefix: "api/products"});

  for(const schema of [...productSchema]){
    server.addSchema(schema);
  }
  try{
    await server.listen({ port: 3002 });
    console.log(`Server listening at 3002`);

  }
  catch(e){
    console.log(e);
    
  }
}
main();