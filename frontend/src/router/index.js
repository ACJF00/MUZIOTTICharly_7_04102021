import { createRouter, createWebHashHistory } from 'vue-router';
import Login from '@/views/Login.vue';
import Message from '@/views/Message.vue';
import NotFound from '@/views/NotFound.vue';
import Profile from "@/views/Profile.vue";
import Feed from "@/views/Feed.vue";

const routes = [
  {
        name: 'login',
        path: '/Login',
        component: Login, 
        meta: {
            title: 'Inscription'
        }
    }, {
        name: 'message',
        path: '/message',
        component: Message,
        props: true,
        meta: {
            title: 'Message'
        },
     }, {
        name: 'feed',
        path: '/feed',
        component: Feed,
        props: true,
        meta: {
            title: 'Feed'
        }
     }, { 
            name: 'profile',
            path: '/profile', 
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
    history: createWebHashHistory(),
    routes,
})

router.afterEach((to, from) => {
    console.log(from, to)
    document.title = to.meta.title;
})

export default router;