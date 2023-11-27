// router.js
import { createRouter, createWebHistory } from "vue-router";
import ProductsList from "./views/ProductsList.vue";
import ProductShow from "./views/ProductShow.vue";
import ProductEdit from "./views/ProductEdit.vue";
import ProductCreate from "./views/ProductCreate.vue";

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
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
