<!-- ProductList.vue -->

<template id="app">
  <div>
    <div class="container-fluid text-center">
      <h2 class="fw-bold mb-5">Product Details</h2>
    </div>
  </div>
  <div class="container">
    <div class="box">
      <div class="product-img">
        <img
          :src="`http://localhost:3002/${product.picture}`"
          class="col col-5"
          alt="Product Image"
          width:700
          height:700
        />
      </div>
      <div class="product-info">
        <h1>{{ product.name }}</h1>
        <h3>Category Id:{{ product.category_id }}</h3>
        <br /><br />
      </div>
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
  },
  data() {
    return {
      product: {},
    };
  },
  mounted() {
    // Convert the received id prop to a Number
    const productId = Number(this.id);

    // Fetch the product details using the converted ID
    this.fetchProduct(productId);
  },
  methods: {
    fetchProduct(productId) {
      axios
        .get("http://localhost:3002/api/products/" + productId)
        .then((response) => {
          this.product = response.data;
          console.log(this.product);
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
  .product-info {
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

.product-img {
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

.product-info {
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
