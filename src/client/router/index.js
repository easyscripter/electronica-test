import VueRouter from 'vue-router'
import Users from '../pages/users/Users';
import Profile from '../pages/profile/Profile';

const routes = [
    {
        path: '/users',
        name: 'Users',
        component: Users,
    },
    {
        path: '/profile/:id',
        name: 'Profile',
        component: Profile,
    },
    {
        path: '/',
        redirect: '/users',
    },
]


const router = new VueRouter({
    routes,
});


export default router