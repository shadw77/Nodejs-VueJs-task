<!-- CategoryList.vue -->

<template id="app">
  <div>
    <div class="container-fluid text-center">
      <h2 class="fw-bold mb-5">Category Details</h2>
    </div>
  </div>
  <div class="container">
    <div class="box">
      <div class="category-img">
        <img
          :src="`http://localhost:3002/${category.picture}`"
          class="col col-5"
          alt="category Image"
          width:700
          height:700
        />
      </div>
      <div class="category-info">
        <h1>{{ category.name }}</h1>
        <h3>Parent Id:{{ category.parent_id }}</h3>
        <br /><br />
      </div>
    </div>
  </div>
  <div>
    <div v-if="category.products?.length > 0">
      <h3>
        Products of
        <span style="color: red; font-weight: bold"> {{ category.name }}</span>
        category
      </h3>
    </div>
    <div v-if="category" class="mt-5">
      <div class="row row-cols-1 row-cols-md-4 g-4">
        <div v-for="product in category.products" :key="product.id" class="col">
          <div class="card">
            <img
              :src="`http://localhost:3002/${product.picture}`"
              alt="Product Image"
              class="card-img-top"
              width="200"
              height="200"
            />
            <div class="card-body">
              <h5 class="card-title">{{ product.name }}</h5>
            </div>
          </div>
        </div>
      </div>

      <div v-if="category.ChildCategories?.length > 0">
        <!-- Display child categories using CategoryTree component -->
        <div class="card">
          <div class="card-header">Child Categories</div>

          <div
            v-for="category in category.ChildCategories"
            :key="category.id"
            class="col"
          >
            <div class="card-body">
              <blockquote class="blockquote mb-0">
                <p>{{ category.name }}</p>
                <CategoryTree :categories="category.ChildCategories" />
              </blockquote>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <p>Loading...</p>
    </div>
  </div>
</template>

<script>
import CategoryTree from "./CategoryTree.vue";
import axios from "axios";
export default {
  components: { CategoryTree },

  props: {
    id: {
      type: [Number, String],
      required: true,
    },
    categories: Array, // Assuming an array of categories is passed as a prop
  },

  data() {
    return {
      category: {},
    };
  },
  mounted() {
    // Convert the received id prop to a Number
    const categoryId = Number(this.id);

    // Fetch the category details using the converted ID
    this.fetchCategory(categoryId);
  },
  methods: {
    fetchCategory(categoryId) {
      axios
        .get("http://localhost:3002/api/categories/" + categoryId)
        .then((response) => {
          this.category = response.data;
          console.log("hiiiii", this.category);
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
};
</script>

<style>
#app {
  font-family: "lato", sans-serif;
}
@import url(https://fonts.googleapis.com/css?family=Archivo+Black);

@media only screen and (max-device-width: 480px) {
  .box {
    margin: 20px;
  }
  .category-info {
    margin: 20px;
  }
}

.container {
  display: flex;
  justify-content: center;
  margin-top: 50px;
  font-family: "Open Sans", sans-serif;
}

.box {
  width: 700px;
  border-radius: 10px;
  box-shadow: 0 0 30px 0 #999;
}

.category-img {
  float: left;
  margin-top: 20px;
  transition: all 0.5s linear;
  &:hover {
    transform: scale(1.03);
  }
}
img {
  object-fit: cover;
}

.category-info {
  float: right;
  margin-top: 20px;
  margin-right: 40px;
}

h1 {
  margin-bottom: 50px;
  font-weight: bold;
  font-size: 2.5em;
  color: #333;
  font-family: "Archivo Black", sans-serif;
}
</style>
