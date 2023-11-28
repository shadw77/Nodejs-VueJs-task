<!-- ProductList.vue -->

<template id="app">
  <h2>All Products</h2>

  <div>
    <div class="container-fluid">
      <button @click="createProduct()" class="btn btn-info">
        Create Product
      </button>
      <table class="table bg-white rounded shadow-sm table-hover">
        <thead>
          <tr>
            <th scope="col">Product Id</th>
            <th scope="col">Product Name</th>
            <th scope="col">Product Picture</th>
            <th scope="col">Category Id</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="product in products" class="" :key="product.id">
            <th scope="row">{{ product.id }}</th>
            <td>{{ product.name }}</td>
<img   :src="`http://localhost:3002/${product.picture}`" alt="Product Image" class="col col-3" />
            <td>{{ product.category_id }}</td>
            <td>
              <button
                @click="showProduct(product.id)"
                type="button"
                class="btn btn-outline-info btn-sm mx-1"
              >
                Show
              </button>

              <button
                @click="editProduct(product.id)"
                type="button"
                class="btn btn-outline-warning btn-sm mx-1"
              >
                Edit
              </button>
              <button
                @click="deleteProduct(product.id)"
                type="button"
                class="btn btn-outline-danger btn-sm mx-1"
              >
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      products: [],
    };
  },
  mounted() {
    this.fetchProducts();
  },
  methods: {
    fetchProducts() {
      axios
        .get("http://localhost:3002/api/products")
        .then((response) => {
          this.products = response.data;
          console.log(this.products);
        })
        .catch((error) => {
          console.error(error);
        });
    },
  
    showProduct(productId) {
      this.$router.push({ name: "show", params: { id: productId } });
      console.log(`Show product with ID: ${productId}`);
    },
    createProduct(){
      this.$router.push({ name: "create" });
      console.log(`Create Product`);

    },
    editProduct(productId) {
      this.$router.push({ name: "edit", params: { id: productId } });
      console.log(`Edit product with ID: ${productId}`);
    },
    deleteProduct(productId) {
      if (confirm("Are you sure you want to delete this product?")) {
        axios
          .delete(`http://localhost:3002/api/products/${productId}`)
          .then((response) => {
            console.log(response.data);
            // After successful deletion, refresh the product list
            this.fetchProducts();
          })
          .catch((error) => {
            console.error(error);
          });
      }
    },    
  },
};
</script>

<style>
#app {
  font-family: "lato", sans-serif;
  margin-top:200px;
}
</style>
