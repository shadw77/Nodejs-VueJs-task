<!-- CategoryEdit.vue -->

<template>
  <div id="app">
    <div class="container-fluid w-75">
      <div class="container-fluid w-75 text-center">
        <h2 class="fw-bold mb-5">Create Category</h2>
      </div>
      <div>
        <div>
          <form @submit.prevent="createCategory()" enctype="multipart/form-data">
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
      category: {
        name: "",
        parent_id: "",
      },
      picture: null,
    };
  },
  mounted() {},
  methods: {
    createCategory() {
      const formData = new FormData();
      formData.append("name", this.category.name);
      formData.append("parent_id", this.category.parent_id);
      formData.append("picture", this.picture);
      axios
        .post(`http://localhost:3002/api/categories/`, formData)
        .then((response) => {
          console.log(response.data);
          this.$router.push("/categories");

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
