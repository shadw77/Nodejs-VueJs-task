<!-- ProductEdit.vue -->

<template>
  <div id="app">
    <div class="container-fluid w-75">
      <div class="container-fluid w-75 text-center">
        <h2 class="fw-bold mb-5">Create Product</h2>
      </div>
      <div>
        <div>
          <form @submit.prevent="createProduct()" enctype="multipart/form-data">
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

            <button type="submit" class="btn btn-primary">Create</button>
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
  mounted() {},
  methods: {
    createProduct() {
      const formData = new FormData();
      formData.append("name", this.product.name);
      formData.append("category_id", this.product.category_id);
      formData.append("picture", this.picture);
      axios
        .post(`http://localhost:3002/api/products/`, formData)
        .then((response) => {
          console.log(response.data);
          this.$router.push("/");

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
}
</style>
