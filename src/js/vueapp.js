/* External Vue stuff */
import Vue from 'vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';

Vue.use(VueRouter);
Vue.use(VueResource);

/* Internal Vue stuff */
import { Title, Table, Dice, Foo, Bar, Page404 } from './vuecomponents.js';
import { timeFilter } from './vuefilters.js';

Vue.filter('toLocaleTime', timeFilter)
Vue.component('header-box', Title);

/* Internal vanilla JS function */
import { helloHelper } from './helperFunctions.js'

const someArray2 = [13, 17, 19, 23];

const router = new VueRouter({
    //mode: 'history', //Reload doesn't work with 'history mode'
    base: __dirname,
    routes: [
        { path: '/', component: Table },
        { path: '/dice', component: Dice },
        { path: '/foo', component: Foo, props: { someArray2: someArray2 } },
        { path: '/bar', component: Bar },
        { path: '/404', component: Page404 },
        { path: '*', redirect: '/404' }
    ]

});



const VueApp = new Vue({
    router,
    el: '#app',
    data: {
        stamps: {},
        user: 'nig',
        someArray: [2, 3, 5, 7, 11, 13, 13, 13, 17, 19],
        title: 'Testing vue, webpack and ecma script 6 imports',
    },
    template: `
        <div class="wrapper"> 
            <header-box :title='title'></header-box>
            <ul id="menu">
                <li><router-link to="/">Home</router-link></li>
                <li><router-link to="/dice">Dice</router-link></li>
                <li><router-link to="/easymoney">Easy money</router-link></li>
                <li><router-link to="/foo">/foo</router-link></li>
                <li><router-link to="/bar">/bar</router-link></li>
                <router-link tag="li" to="/bar" :event="['mousedown', 'touchstart']">
                    <a>/bar</a>
                </router-link>
            </ul>
            <router-view class="view" :some-array="someArray"></router-view>
        </div>
    `,
    created: function() {
        helloHelper('from "VueApp" in vueapp.js');
    }
})

export { VueApp, router };