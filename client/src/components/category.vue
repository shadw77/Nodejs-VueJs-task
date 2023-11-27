<template>
  <div>
    <h2>Categories List</h2>
    <ul>
      <li v-for="category in categories" :key="category.id">
        {{ category.name }} ({{ calculateProductsCount(category) }})
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';

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
        .get('http://localhost:3000/api/categories')
        .then((response) => {
          this.categories = response.data;
          console.log(this.categories);
        })
        .catch((error) => {
          console.error(error);
        });
    },
    calculateProductsCount(category) {
      // Implement logic to calculate product count for the category and its children
      return this.recursiveProductCount(category);
    },
    recursiveProductCount(category) {
      let count = category.products.length;

      for (const childCategory of category.ChildCategories) {
        count += this.recursiveProductCount(childCategory);
      }

      return count;
    },
  },
};
</script>

<style>
/* Add your styles here */
</style>