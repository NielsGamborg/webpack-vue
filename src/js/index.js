/* External Vue stuff */ 
import Vue from 'vue';
import VueResource from 'vue-resource';

/* Internal Vue stuff */
import Vueapp from './vueapp.js';
import {title, dice, table} from './vuecomponents.js';
import {timeFilter} from './vuefilters.js';

/* External packages */
import _ from 'lodash'

/* Vanilla JS functions */  
import {helloHelper} from './helperFunctions.js'

/* Styles and images */ 
import '../css/style.css';
import '../css/style2.css';
import '../img/metal.jpg';


Vue.filter('toLocaleTime', timeFilter)
Vue.component('header-box', title);
Vue.component('table-box', table);
Vue.component('dice-box', dice);
Vue.use(VueResource);

new Vue(Vueapp);

helloHelper('Webpack');

