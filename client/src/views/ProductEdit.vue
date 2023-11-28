<!-- ProductEdit.vue -->

<template>
  <div>
    <div class="container-fluid w-75">
      <div class="container-fluid w-75 text-center">
        <h2 class="fw-bold mb-5">Edit Product</h2>
      </div>
      <div>
        <div>
          <form @submit.prevent="updateProduct()" enctype="multipart/form-data">
            <div class="mb-3">
              <label for="name" class="form-label">Name</label>
              <input
                type="text"
                class="form-control"
                id="name"
                v-model="product.name"
                required
              />
            </div>
            <div class="mb-3">
              <label for="picture" class="form-label">Picture</label>
              <input
                type="file"
                class="form-control"
                id="picture"
                @change="handlePictureChange"
              />
            </div>

            <div class="mb-3">
              <label for="category_id" class="form-label">Category Id</label>
              <input
                type="text"
                class="form-control"
                id="category_id"
                v-model="product.category_id"
                required
              />
            </div>

            <button type="submit" class="btn btn-primary">Update</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      product: {
        name: "",
        category_id: "",
      },
      picture: null,
    };
  },
  mounted() {
    // Retrieve the product id from the route params
    const productId = this.$route.params.id;

    // Fetch the product details using the id
    axios
      .get(`http://localhost:3002/api/products/${productId}`)
      .then((response) => {
        this.product = response.data;
      })
      .catch((error) => {
        console.error(error);
      });
  },
  methods: {
    updateProduct() {
      const formData = new FormData();
      formData.append("name", this.product.name);
      formData.append("category_id", this.product.category_id);
      formData.append("picture", this.picture);
      axios
        .put(`http://localhost:3002/api/products/${this.product.id}`, formData)
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    },
    handlePictureChange(event) {
      this.picture = event.target.files[0];
    },
  },
};
</script>

<style scoped>
#app {
  font-family: "lato", sans-serif;
  /* Add your creative styles here */
  /* Example: */
  background-color: #f5f5f5;
  padding: 20px;
}

/* Add additional styling as needed */
</style>
