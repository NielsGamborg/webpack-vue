/* Requiring index.html via file-loader plugin */
/*require('file-loader?name=[name].[ext]!../index.html');*/

/* Internal Vue stuff */
import { VueApp } from "./vueapp.js";

/* Vanilla JS functions */
import { helloHelper } from "./helperFunctions.js";

/* Styles and images */
import "../css/style.css";
import "../css/style2.css";
import "../img/metal.jpg";
import "../img/ravenna.png";

helloHelper("from index.js");
