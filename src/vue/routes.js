import Vue from 'vue';
import VueRouter from 'vue-router';

import MovieItemComponent from './components/movieitem.vue';
import HomeComponent from './components/home.vue';
import EditComponent from './components/edit.vue';
import AddComponent from './components/add.vue';
import SignInComponent from './components/signin.vue';
//import VueResource from 'vue-resource';

Vue.use(VueRouter);

const routes = [
    { path: '/', component: HomeComponent, name: 'home' },
    { path: '/movie/:id', component: MovieItemComponent, name: 'movieitem' },
    { path: '/movie/:id/edit', component: EditComponent, name: 'edit' },
    { path: '/new', component: AddComponent, name: 'add' },
    { path: '/signin', component: SignInComponent, name: 'signin' }
];

export default new VueRouter({
    routes
});