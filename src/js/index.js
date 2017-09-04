import Vue from 'vue';
import Vueresource from 'vue-resource';

import Vueapp from './vueapp.js';
import {title, button} from './vuecomponents.js';

import {helloHelper} from './helperFunctions.js'

/* Styles and images */ 
import '../css/style.css';
import '../css/style2.css';
import '../img/metal.jpg';

Vue.component('header-box', title)
Vue.component('button-box', button)
Vue.use(VueResource);
new Vue(Vueapp);

helloHelper('Webpack');

