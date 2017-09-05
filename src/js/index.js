/* External Vue stuff */ 
import Vue from 'vue';
import VueResource from 'vue-resource';

/* Internal Vue stuff */
import Vueapp from './vueapp.js';
import {title, button, table} from './vuecomponents.js';
import {timeFilter} from './vuefilters.js';

/* Vanilla JS functions */  
import {helloHelper} from './helperFunctions.js'

/* Styles and images */ 
import '../css/style.css';
import '../css/style2.css';
import '../img/metal.jpg';


Vue.filter('toLocaleTime', timeFilter)
Vue.component('header-box', title);
Vue.component('button-box', button);
Vue.component('list-box', table);
Vue.use(VueResource);
new Vue(Vueapp);

helloHelper('Webpack');

