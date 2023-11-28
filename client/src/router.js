// router.js
import { createRouter, createWebHistory } from "vue-router";
import ProductsList from "./views/Product/ProductsList.vue";
import ProductShow from "./views/Product/ProductShow.vue";
import ProductEdit from "./views/Product/ProductEdit.vue";
import ProductCreate from "./views/Product/ProductCreate.vue";

import CategoriesList from "./views/Category/CategoriesList.vue";
import CategoryShow from "./views/Category/CategoryShow.vue";
import CategoryEdit from "./views/Category/CategoryEdit.vue";
import CategoryCreate from "./views/Category/CategoryCreate.vue";

const routes = [
  {
    path: "/",
    component: ProductsList,
  },
  {
    path: "/show/:id",
    name: "show",
    component: ProductShow,
    props: true,
  },
  {
    path: "/edit/:id",
    name: "edit",
    component: ProductEdit,
    props: true,
  },
  {
    path: "/create",
    name: "create",
    component: ProductCreate,
  },

  {
    path: "/categories",
    component: CategoriesList,
  },
  {
    path: "/show-category/:id",
    name: "show-category",
    component: CategoryShow,
    props: true,
  },
  {
    path: "/edit-category/:id",
    name: "edit-category",
    component: CategoryEdit,
    props: true,
  },
  {
    path: "/create-category",
    name: "create-category",
    component: CategoryCreate,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
