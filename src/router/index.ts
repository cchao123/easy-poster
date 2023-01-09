import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import HomeView from "../components/views/HomeView.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/home",
    name: "home",
    component: HomeView,
  },
  {
    path: "/readme",
    name: "readme",
    component: () =>
      import(/* webpackChunkName: "readme" */ "../components/views/Readme.vue"),
  },
  {
    path: "/setting",
    name: "setting",
    // route level code-splitting
    // this generates a separate chunk (setting.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "setting" */ "../components/views/Setting.vue"),
  },
];

const router = createRouter({
  // history: createWebHistory(process.env.BASE_URL),
  history: createWebHistory(),
  routes,
});

export default router;