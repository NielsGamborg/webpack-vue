/* External Vue stuff */
import Vue from 'vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';

/* Own Vue stuff */
import {Title, Table, Dice, Foo, Bar, Home} from './vuecomponents.js';
import {timeFilter} from './vuefilters.js';


Vue.filter('toLocaleTime', timeFilter)
Vue.component('header-box', Title);
Vue.component('table-box', Table);
Vue.component('dice-box', Dice);

Vue.use(VueRouter);
Vue.use(VueResource);

Vue.filter('toLocaleTime', timeFilter)


const router = new VueRouter({
    mode: 'history',
    base: __dirname,
    routes: [
      { path: '/', component: Home },
      { path: '/dice', component: Dice },
      { path: '/stamps', component: Table },
      { path: '/foo', component: Foo },
      { path: '/bar', component: Bar }
  ]

});



const VueApp = new Vue( {
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
            <ul>
                <li><router-link to="/">Home</router-link></li>
                <li><router-link to="/stamps">Stamps</router-link></li>
                <li><router-link to="/dice">Dice</router-link></li>
                <li><router-link to="/foo">/foo</router-link></li>
                <li><router-link to="/bar">/bar</router-link></li>
                <router-link tag="li" to="/bar" :event="['mousedown', 'touchstart']">
                    <a>/bar</a>
                </router-link>
            </ul>
            <router-view class="view" :some-array="someArray"></router-view>
        </div>
    `,
    methods: {
        testFunction: function () {
            console.log('this.someArray', this.someArray)
        }
    },
    created: function () {
        this.testFunction();
    }
})

export { VueApp };