<!-- CategoryEdit.vue -->

<template>
  <div>
    <div class="container-fluid w-75">
      <div class="container-fluid w-75 text-center">
        <h2 class="fw-bold mb-5">Edit Category</h2>
      </div>
      <div>
        <div>
          <form @submit.prevent="updateCategory()" enctype="multipart/form-data">
            <div class="mb-3">
              <label for="name" class="form-label">Name</label>
              <input
                type="text"
                class="form-control"
                id="name"
                v-model="category.name"
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
              <label for="parent_id" class="form-label">Parent Id</label>
              <input
                type="text"
                class="form-control"
                id="parent_id"
                v-model="category.parent_id"
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
      category: {
        name: "",
        category_id: "",
      },
      picture: null,
    };
  },
  mounted() {
    // Retrieve the category id from the route params
    const categoryId = this.$route.params.id;

    // Fetch the category details using the id
    axios
      .get(`http://localhost:3002/api/categorys/${categoryId}`)
      .then((response) => {
        this.category = response.data;
      })
      .catch((error) => {
        console.error(error);
      });
  },
  methods: {
    updateCategory() {
      const formData = new FormData();
      formData.append("name", this.category.name);
      formData.append("category_id", this.category.category_id);
      formData.append("picture", this.picture);
      axios
        .put(`http://localhost:3002/api/categories/${this.category.id}`, formData)
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
