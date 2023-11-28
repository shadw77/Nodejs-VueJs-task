<template>
  <div class="container-fluid">
    <h2 class="fw-bold">Select Category</h2>
    <select v-model="selectedCategoryId" class="form-select" @change="handleCategoryChange">
      <option value="">Select a Category</option>
      <option v-for="category in topParentCategories" :key="category.id" :value="category.id">
        {{ category.name }}
      </option>
    </select>

    <div v-if="selectedCategoryId">
      <h3 class="fw-bold text-danger">Selected Category: {{ selectedCategoryName }}</h3>

      <!-- Display products of the selected category -->
      <ul>
        <li v-for="product in selectedCategoryProducts" :key="product.id">
          {{ product.name }}
        </li>
      </ul>

      <!-- Display children categories of the selected category -->
      <div v-if="selectedCategoryChildren.length">
        <h4 class="fw-bold text-danger">Children Categories:</h4>
        <ul>
          <li v-for="childCategory in selectedCategoryChildren" :key="childCategory.id">
            {{ childCategory.name }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      categories: [], // Full list of categories
      topParentCategories: [], // Top-level parent categories
      selectedCategoryId: "",
      selectedCategoryName: "",
      selectedCategoryProducts: [],
      selectedCategoryChildren: [],
    };
  },
  mounted() {
    // Fetch all categories initially
    this.fetchAllCategories();
  },
  methods: {
    async fetchAllCategories() {
      try {
        const response = await axios.get("http://localhost:3002/api/categories");
        this.categories = response.data;

        // Extract top-level parent categories
        this.topParentCategories = this.categories.filter((category) => !category.parent_id);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    },
    async fetchSelectedCategory() {
      try {
        const response = await axios.get(`http://localhost:3002/api/categories/${this.selectedCategoryId}`);
        this.selectedCategoryName = response.data.name;
        this.selectedCategoryProducts = response.data.products;
        this.selectedCategoryChildren = this.categories.filter((category) => category.parent_id === this.selectedCategoryId);
      } catch (error) {
        console.error("Error fetching selected category:", error);
      }
    },
    handleCategoryChange() {
      // Fetch and display children of the selected category
      this.fetchSelectedCategory();
    },
  },
};
</script>

<style>
/* Add your styling here if needed */
</style>