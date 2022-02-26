import { createRouter, createWebHistory } from "vue-router";
import Login from "@/views/Login.vue";
//import Message from "@/views/Message.vue";
import NotFound from "@/views/NotFound.vue";
import Profile from "@/views/Profile.vue";
import Feed from "@/views/Feed.vue";
import OneMessage from "@/views/OneMessage.vue";
import UsersList from "@/views/UsersList.vue";

const routes = [
  {
    name: "login",
    path: "/Login",
    component: Login,
    meta: {
      title: "Inscription",
    },
  },
  /*{
    name: "message",
    path: "/Message",
    component: Message,
    meta: {
      title: "Message",
    },
  },*/
  {
    name: "OneMessage",
    path: "/oneMessage/:id",
    component: OneMessage,
    meta: {
      title: "OneMessage",
    },
  },
  {
    name: "feed",
    path: "/Feed",
    component: Feed,
    props: true,
    meta: {
      title: "Feed",
    },
  },
  {
    name: "profile",
    path: "/Profile",
    component: Profile,
    props: true,
    meta: {
      title: "Profil",
    },
  },
  {
    name: "NotFound",
    path: "/:pathMatch(.*)",
    component: NotFound,
    meta: {
      title: "404 not found",
    },
  },
  {
    name: "UsersList",
    path: "/UsersList",
    component: UsersList,
    meta: {
      title: "Liste des utilisateurs",
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Avant de rediriger le visiteur
router.beforeEach((to, from, next) => {
  const user = localStorage.getItem("user");
  if (!user && to.path !== "/Login") {
    if (from.path === "/Login") {
      alert("Page protégée, connexion requise !");
    }
    next("/Login");
  } else {
    next();
  }
});

router.afterEach((to, from) => {
  console.log(from, to);
  document.title = to.meta.title;
});

export default router;
