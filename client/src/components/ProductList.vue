<!-- ProductList.vue -->

<template id="app">
  <div>
    <div class="container">
      <h2>All Products</h2>
      <ul class="responsive-table">
        <li class="table-header">
          <div class="col col-1">Product Id</div>
          <div class="col col-2">Product Name</div>
          <div class="col col-3">Product Picture</div>
          <div class="col col-4">Category Id</div>
        </li>
        <li v-for="product in products" class="table-row" :key="product.id">
          <div class="col col-1" >{{product.id}}</div>
          <div class="col col-2" >{{product.name}}</div>
          <img :src="`${product.picture}`" class="col col-3" alt="Product Image">
          <div class="col col-4" >{{product.category_id}}</div>
        </li>
     
      
       
      </ul>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      products: [],
    };
  },
  mounted() {
    this.fetchProducts();
  },
  methods: {
    fetchProducts() {
      axios
        .get("http://localhost:3002/api/products")
        .then((response) => {
          this.products = response.data;
          console.log(this.products);
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
.container {
  max-width: 1000px;
  margin-left: auto;
  margin-right: auto;
  padding-left: 10px;
  padding-right: 10px;
}

h2 {
  font-size: 26px;
  margin: 20px 0;
  text-align: center;
  small {
    font-size: 0.5em;
  }
}


.responsive-table   li {
    border-radius: 3px;
    padding: 25px 30px;
    display: flex;
    justify-content: space-between;
    margin-bottom: 25px;
  }
 .responsive-table  .table-header {
    background-color: #95a5a6;
    font-size: 14px;
    text-transform: uppercase;
    letter-spacing: 0.03em;
  }
 .responsive-table  .table-row {
    background-color: #ffffff;
    box-shadow: 0px 0px 9px 0px rgba(0, 0, 0, 0.1);
  }
.responsive-table   .col-1 {
    flex-basis: 10%;
  }
 .responsive-table  .col-2 {
    flex-basis: 40%;
  }
 .responsive-table  .col-3 {
    flex-basis: 25%;
  }
 .responsive-table  .col-4 {
    flex-basis: 25%;
  }

  @media all and (max-width: 767px) {
    .table-header {
      display: none;
    }
    .table-row {
    }
    li {
      display: block;
    }
    .col {
      flex-basis: 100%;
    }
    .col {
      display: flex;
      padding: 10px 0;
      &:before {
        color: #6c7a89;
        padding-right: 10px;
        content: attr(data-label);
        flex-basis: 50%;
        text-align: right;
      }
    }
  }

</style>
