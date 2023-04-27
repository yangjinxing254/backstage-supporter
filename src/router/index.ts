import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import { usePermissStore } from '../store/permiss';
import Home from '../views/home.vue';

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        redirect: '/dashboard',
    },
    {
        path: '/',
        name: 'Home',
        component: Home,
        children: [
            {
                path: '/dashboard',
                name: 'dashboard',
                meta: {
                    title: '首页',
                    permiss: '1',
                },
                component: () => import(/* webpackChunkName: "dashboard" */ '../views/dashboard.vue'),
            },
            {
                path: '/appointment',
                name: 'appointment',
                meta: {
                    title: '预约入城',
                    permiss: '2',
                },
                component: () => import(/* webpackChunkName: "table" */ '../views/appointment.vue'),
            },
            {
                path: '/articleList',
                name: 'articleList',
                meta: {
                    title: '文章列表',
                    permiss: '3',
                },
                component: () => import(/* webpackChunkName: "charts" */ '../views/articleList.vue'),
            },
            {
                path: '/markdown',
                name: 'markdown',
                meta: {
                    title: '发布文章',
                    permiss: '4',
                },
                component: () => import(/* webpackChunkName: "markdown" */ '../views/markdown.vue'),
            },
            {
                path: '/messageList',
                name: 'messageList',
                meta: {
                    title: '留言列表',
                    permiss: '5',
                },
                component: () => import(/* webpackChunkName: "form" */ '../views/messageList.vue'),
            },
            {
                path: '/publishMessage',
                name: 'publishMessage',
                meta: {
                    title: '发布留言',
                    permiss: '6',
                },
                component: () => import(/* webpackChunkName: "tabs" */ '../views/publishMessage.vue'),
            },
            {
                path: '/user',
                name: 'user',
                meta: {
                    title: '用户列表',
                    permiss: '7',
                },
                component: () => import(/* webpackChunkName: "donate" */ '../views/user.vue'),
            },
            {
                path: '/adminConfig',
                name: 'adminConfig',
                meta: {
                    title: '个人中心',
                    permiss: '8',
                },
                component: () => import(/* webpackChunkName: "donate" */ '../views/adminConfig.vue'),
            },
        ],
    },
    {
        path: '/login',
        name: 'Login',
        meta: {
            title: '登录',
        },
        component: () => import(/* webpackChunkName: "login" */ '../views/login.vue'),
    },
    {
        path: '/403',
        name: '403',
        meta: {
            title: '没有权限',
        },
        component: () => import(/* webpackChunkName: "403" */ '../views/403.vue'),
    },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    document.title = `${to.meta.title} | vue-manage-system`;
    const role = localStorage.getItem('ms_username');
    const permiss = usePermissStore();
    if (!role && to.path !== '/login') {
        next('/login');
    } else if (to.meta.permiss && !permiss.key.includes(to.meta.permiss)) {
        // 如果没有权限，则进入403
        next('/403');
    } else {
        next();
    }
});

export default router;
