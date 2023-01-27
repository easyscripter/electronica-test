import Vue from "vue";
import Vuetify from "vuetify/lib";
import router from "../../router";
import VueRouter from 'vue-router'

import 'vuetify/dist/vuetify.css';

import Main from './Main';

Vue.use(VueRouter);
Vue.use(Vuetify, { iconfont: 'mdi' });



new Vue({
    vuetify : new Vuetify(),
    router  : router,
    render  : (h) => h(Main)
}).$mount('#app');