import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/shows",
    name: "Shows",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Shows.vue")
  },
  {
    path: "/shows/:id",
    name: "ShowInfo",
    component: () =>
      import(/* webpackChunkName: "show" */ "../views/ShowDetails.vue")
  },
  {
    path: "/artists",
    name: "Artists",
    component: () =>
      import(/* webpackChunkName: "show" */ "../views/Artists.vue")
  },
  {
    path: "/artists/:mbid",
    name: "Artist",
    component: () =>
      import(/* webpackChunkName: "show" */ "../views/ArtistDetails.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
  scrollBehavior() {
    return { x: 0, y: 0 };
  }
});

export default router;
