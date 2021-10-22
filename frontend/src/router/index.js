import { createRouter, createWebHistory } from 'vue-router';
import Login from '@/views/Login.vue';
import Message from '@/views/Message.vue';
import NotFound from '@/views/NotFound.vue';
import Profile from "@/views/Profile.vue";
import Feed from "@/views/Feed.vue";

const routes = [
  {
        name: 'login',
        path: '/',
        component: Login, 
        meta: {
            title: 'Inscription'
        }
    }, {
        name: 'message',
        path: '/Message',
        component: Message,
        meta: {
            title: 'Message'
        },
     }, {
        name: 'feed',
        path: '/Feed',
        component: Feed,
        props: true,
        meta: {
            title: 'Feed'
        }
     }, { 
            name: 'profile',
            path: '/Profile', 
            component: Profile, 
            props: true,
            meta: {
                title: 'Profil'
            }
          }, {
        name: 'NotFound',
        path: '/:pathMatch(.*)',
        component: NotFound,
        meta: {
            title: '404 not found'
        }
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
})

router.afterEach((to, from) => {
    console.log(from, to)
    document.title = to.meta.title;
})

export default router;