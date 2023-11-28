<!-- ProductList.vue -->

<template id="app">
  <h2  class="mx-5 mb-3">All Categories</h2>

  <div  class="mx-5 "><button @click="createProduct()" class="btn btn-info mb-4">
        Create Product
      </button>
    <div class="container-fluid text-center">
      
      <table class="table bg-white rounded shadow-sm table-hover">
        <thead>
          <tr>
            <th scope="col">Category Id</th>
            <th scope="col">Category Name</th>
            <th scope="col">Category Picture</th>
            <th scope="col">Parent Id</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="category in categories" class="" :key="category.id">
            <th scope="row">{{ category.id }}</th>
            <td>{{ category.name }}</td>
            <img
              :src="`http://localhost:3002/${category.picture}`"
              alt="category Image"
              class="col col-3"
            />
            <td>{{ category.parent_id }}</td>
            <td class="col col-3">
              <button
                @click="showCategory(category.id)"
                type="button"
                class="btn btn-outline-info  mx-1 "
              >
                Show
              </button>

              <button
                @click="editCategory(category.id)"
                type="button"
                class="btn btn-outline-warning  mx-1"
              >
                Edit
              </button>
              <button
                @click="deleteCategory(category.id)"
                type="button"
                class="btn btn-outline-danger  mx-1"
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
      categories: [],
    };
  },
  mounted() {
    this.fetchCategories();
  },
  methods: {
    fetchCategories() {
      axios
        .get("http://localhost:3002/api/categories")
        .then((response) => {
          this.categories = response.data;
          console.log(this.categories);
        })
        .catch((error) => {
          console.error(error);
        });
    },

    showCategory(categoryId) {
      this.$router.push({ name: "show-category", params: { id: categoryId } });
      console.log(`Show category with ID: ${categoryId}`);
    },
    createCategory() {
      this.$router.push({ name: "create-category" });
      console.log(`Create category`);
    },
    editCategory(categoryId) {
      this.$router.push({ name: "edit-category", params: { id: categoryId } });
      console.log(`Edit category with ID: ${categoryId}`);
    },
    deleteCategory(categoryId) {
      if (confirm("Are you sure you want to delete this category?")) {
        axios
          .delete(`http://localhost:3002/api/categories/${categoryId}`)
          .then((response) => {
            console.log(response.data);
            // After successful deletion, refresh the category list
            this.fetchCategories();
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
  margin-top: 200px;
}
</style>
