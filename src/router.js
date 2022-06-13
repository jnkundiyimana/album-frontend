import { createWebHistory, createRouter } from "vue-router";
const routes =  [
  {
    path: "/tutorials",
    name: "tutorials",
    component: () => import("./views/TutorialsList.vue")
  },
  {
    path: "/",
    alias: "/albums",
    name: "albums",
    component: () => import("./views/AllAlbums.vue")
  },
  // {
  //   path: "/edit/:id",
  //   name: "edit",
  //   component: () => import("./views/EditTutorial.vue"),
  //   props: true
  // },
  {
    path: "/edit/:id",
    name: "edit",
    component: () => import("./views/EditAlbum.vue"),
    props: true
  },
  {
    path: "/add-album",
    name: "add",
    component: () => import("./views/AddAlbum.vue")
  },
  {
    path: "/view",
    name: "view",
    component: () => import("./views/ViewTutorial.vue"),
    props: true
  },
  {
    path: "/viewAlbum/:id",
    name: "viewAlbum",
    component: () => import("./views/ViewAlbum.vue"),
    props: true
  },
  {
    path: "/addLesson",
    name: "addLesson",
    component: () => import("./views/AddLesson.vue"),
    props: true
  },
  {
    path: "/editLesson",
    name: "editLesson",
    component: () => import("./views/EditLesson.vue"),
    props: true
  },
  {
    path: '/artistList',
    name: 'artistList',
    component: () => import("./views/ArtistView/ArtistList.vue"),
    props: true
  },
  {
    path: '/addArtist',
    name: 'addArtist',
    component: () => import("./views/ArtistView/AddArtist.vue"),
    props: true
  },
  {
    path: '/editArtist/:id',
    name: 'editArtist',
    component: () => import("./views/ArtistView/EditArtist.vue"),
    props: true
  }
];
const router = createRouter({
  base: process.env.NODE_ENV === 'development' ? '/' : '/tutorial-frontend-1/',
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;