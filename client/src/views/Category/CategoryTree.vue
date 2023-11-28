<!-- CategoryTree.vue -->

<template>
  <ul>
    <li v-for="category in categories" :key="category.id">
      {{ category.name }}
      <!-- Recursively render child categories using CategoryTree component -->
      <CategoryTree :categories="category.ChildCategories" v-if="category.ChildCategories.length > 0" />
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    categories: Array,
  },
};
</script>

<style scoped>
/* Add your styling here if needed */
</style>
