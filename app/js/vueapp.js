/* External Vue stuff */
import Vue from 'vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import Vuex from 'vuex'

/* Vue plugins  */
//import createPersistedState from 'vuex-persistedstate'; //saves state to local storage to keep state at reload 

Vue.use(VueRouter);
Vue.use(VueResource);
Vue.use(Vuex);

/* Internal Vue stuff */
import { Title, Stamps, Dice, Foo, Bar, Page404, Routeinfo, BarHome, BarBar, BarFoo } from './vuecomponents.js';
import { timeFilter } from './vuefilters.js';

Vue.filter('toLocaleTime', timeFilter)
Vue.component('header-box', Title);
Vue.component('routeinfo-box', Routeinfo);

/* Vanilla JS function */
import { helloHelper } from './helperFunctions.js'

const router = new VueRouter({
    //mode: 'history', //Reload doesn't work with 'history mode'
    base: __dirname,
    linkActiveClass: 'hey-i-am-active',
    routes: [
        { path: '/home', component: Stamps, alias: '/stamps' },
        { path: '/', redirect: '/home' },
        { path: '/dice', component: Dice },
        { path: '/foo', components: { default: Foo, footer: Bar }, props: { default: { someArray2: [13, 17, 19, 23, 27] } } },
        {
            path: '/bar',
            components: { default: Bar, footer: Foo },
            redirect: '/bar/home',
            children: [{
                    path: 'home',
                    component: BarHome
                },
                {
                    path: 'foo',
                    component: BarFoo
                },
                {
                    path: 'bar',
                    component: BarBar
                }
            ]
        },
        { path: '/404', component: Page404 },
        { path: '*', redirect: '/404' }
    ]
});

const store = new Vuex.Store({
    //plugins: [createPersistedState()], //saves state to local storage to keep state at reload 
    state: {
        count: 0,
        routechange: 0,
        user: '',
        diceObj: {
            vuedice: {
                outcome: '?',
                rolls: 0,
                total: 0,
            },
            vanilladice: {
                outcome: '?',
                rolls: 0,
                total: 0,
            }
        }
    },
    mutations: {
        plus10(state) {
            state.count = state.count + 10;
        },
        resetcounter(state) {
            state.count = 0;
        },
        setUser(state, user) {
            state.user = user;
        },
        updateDice(state, diceObj) {
            state.diceObj = diceObj
        },
        resetDice(state) {
            state.diceObj = {
                vuedice: {
                    outcome: '?',
                    rolls: 0,
                    total: 0,
                },
                vanilladice: {
                    outcome: '?',
                    rolls: 0,
                    total: 0,
                }
            }
        }
    }
})



const VueApp = new Vue({
    router,
    store,
    el: '#app',
    data: {
        stamps: {},
        user: '',
        someArray: [2, 3, 5, 7, 11, 13, 13, 13, 17, 19],
        title: 'Testing vue, webpack and ecma script 6 imports',
    },
    template: `
        <div class="wrapper"> 
            <header-box :title='title'></header-box>
            <ul id="menu">
                <li><router-link to="/home" excact>Home</router-link></li>
                <li><router-link to="/dice">Dice</router-link></li>
                <li><router-link to="/bar">/bar</router-link></li>
                <li>
                    <router-link tag="a" to="/foo" :event="['mousedown', 'touchstart']">
                        <span>/foo</span>
                    </router-link>
                </li>
                <li><router-link to="/easymoney">Easy money</router-link></li>
            </ul>
            <routeinfo-box></routeinfo-box>
            <router-view class="view" :some-array="someArray"></router-view>
            <router-view class="view 2" id="footer" name="footer"></router-view>
        </div>
    `,
    created: function() {
        helloHelper('from "VueApp" in vueapp.js');
    }
})

export { VueApp, router, store };