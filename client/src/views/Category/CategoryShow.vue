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
      <div v-if="category">
      <h2>{{ category.name }}</h2>
      <ul>
        <li v-for="product in category.products" :key="product.id">{{ product.name }}</li>
      </ul>
      <div v-if="category.ChildCategories?.length > 0">
        <h3>Child Categories</h3>
        <CategoryTree :categories="category.ChildCategories" />
      </div>
    </div>
    <div v-else>
      <p>Loading...</p>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  props: {
      id: {
      type: [Number, String],
      required: true,
    },
    categories: Array, // Assuming an array of categories is passed as a prop
  },
  components: {
    CategoryTree: {
      props: ['categories'],
      template: `
        <ul>
          <li v-for="category in categories" :key="category.id">
            {{ category.name }}
            <ul>
              <li v-for="product in category.products" :key="product.id">{{ product.name }}</li>
            </ul>
            <category-tree v-if="category.ChildCategories.length > 0" :categories="category.ChildCategories" />
          </li>
        </ul>
      `,
    },
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
          console.log("hiiiii",this.category);
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
img{
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
