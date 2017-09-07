/* External packages */
import _ from 'lodash'

/* Internal Vue stuff */
import { router } from './vueapp.js';

/* Internal vanilla JS function */
import { helloHelper, diceRollHelper } from './helperFunctions.js'

/* Bogus data when offline */
import fileData from './data.json';


/* The Components  */
const Title = {
    props: ['title'],
    template: `
        <h1>{{ this.title }}</h1>
    `,
}


const Routeinfo = {
    props: [],
    template: `
        <div id="routeinfo">
            <h3>Router info</h3>
            <h4>Route to</h4>
            <ul>
                <li>Route path: {{ this.routeTo.path}}</li>
                <li v-if="routeTo.path !== routeTo.fullPath">Route full path: {{ this.routeTo.fullPath}}</li>
                <li v-if="!_.isEmpty(routeTo.query)" >Route query params: 
                    <ul>
                        <li v-for="(value, key)  in routeTo.query">{{ key }}: {{value }}</li>
                    </ul>
                </li>
            </ul>
            <h4>Route from</h4>
            <ul>
                <li>Route path: {{ this.routeFrom.path}}</li>
                <li v-if="routeFrom.path !== routeFrom.fullPath">Route full path: {{ this.routeFrom.fullPath}}</li>
                <li v-if="!_.isEmpty(routeFrom.query)" >Route query params: 
                    <ul>
                        <li v-for="(value, key)  in routeFrom.query">{{ key }}: {{value }}</li>
                    </ul>
                </li>
            </ul>
        </div>
    `,
    data: function () {
        return {
            routeTo: {},
            routeFrom: {},
        }
    },
    watch: {
        '$route'(to, from) {
            this.routeFrom = from;
            this.routeTo = to;
        }
    },
    created: function() {
        this.routeTo = this.$router.app._route;
      },
}


const Stamps = {
    props: [],
    data: function () {
        return {
            stamps: {},
            user: '',
            stampNumbers: 20,
            stampType: '',
            url: '',
            error: false,
            allUsers: ['nig', 'teg'],
            fileData: fileData
        }
    },
    template: `
        <div id="table-box">
            <h3>Stemplinger for {{ user }}</h3>
            <div id="userInput">
                Initialer: <input type="text "v-model="user" v-on:keyup.enter="getData()">
                Show rows: <select v-model="stampNumbers">
                    <option value="20">20</option> 
                    <option value="100">100</option> 
                    <option value="1000">All</option> 
                </select>
                <br>
                <br>
                Alle:<input type="radio" name="stampType" v-model="stampType" value="" /> 
                Ind:<input type="radio" name="stampType" v-model="stampType" value="ind" /> 
                Ud:<input type="radio" name="stampType" v-model="stampType" value="ud" /> 
                <button v-on:click="getData()">Fetch data</button>
            </div>
            
            <div v-if="error && this.user.length > 1" class="error">
                <p>Username: "{{ user }}" doesn't exists in the spot service</p>
            </div>
            <template v-if="!error && this.user !== ''">    
                <table>
                    <tbody>
                        <tr v-for="(item, index) in stamps" v-if="item.wintidStempKodeTekst.toLowerCase().includes(stampType) && index < stampNumbers"> <!-- Use if online -->
                        <!-- <tr v-for="(item, index) in fileData" v-if="item.wintidStempKodeTekst.toLowerCase().includes(stampType)"> <!-- Use if offline -->
                            <td>{{ item.time | toLocaleTime }}</td>
                            <td>{{ item.terminalName }}</td>
                            <td>{{ item.wintidStempKodeTekst }}</td>
                        </tr> 
                    </tbody>   
                </table>
            </template>
        </div>   
    `,
    watch: {
        user: _.debounce(function () {
            if (this.user.length > 1) {
                this.getData();
            }
        }, 300)
    },
    methods: {
        getData: function () {
            if (this.allUsers.includes(this.user)) {
                console.log('user exists');
                this.url = '/spot-service/spot/services/medarbejder/access/' + this.user;
                this.$http.get(this.url).then(response => {
                    this.stamps = response.body;
                    this.error = false;
                    console.log('response.body', response.body);
                    router.push({ //pushing user to URL if success
                        query: {
                            user: this.user,
                        }
                    });
                }, response => {
                    console.log('Error!', response);
                    this.stamps = {};
                    this.error = true; // Use if online
                    /*  Use if offline
                    this.error = false; 
                    router.push({ //pushing hardcoded user to URL if offline
                        query: {
                            user: this.user,
                        }
                    });*/
                });
            } else {
                console.log("user doesn't exist")
            }
        }
    },
    created: function () {
        helloHelper("from 'Stamps' component in vuecomponents.js");
    }
}


const Dice = {
    props: [],
    data: function () {
        return {
            outcome: '',
            outcome2: '',
        }
    },
    template: `
        <div>
            <h3>Dice</h3>
            <button v-on:click="diceRoll()">Roll Vue dice</button>
            <p>{{ this.outcome }}</p>
            <button v-on:click="diceRollImported()">Roll Vanilla dice</button>
            <p>{{ this.outcome2 }}</p>
        </div>    
    `,
    methods: {
        diceRoll: function () {
            this.outcome = Math.floor(Math.random() * 6 + 1);
            router.push({
                query: {
                    vuedice: this.outcome,
                    vanilladice: this.outcome2,
                }
            });
        },
        diceRollImported: function () {
            this.outcome2 = diceRollHelper();
            router.push({
                query: {
                    vuedice: this.outcome,
                    vanilladice: this.outcome2,
                }
            });
        }
    },
    created: function () {
        this.diceRoll();
        this.diceRollImported();
    }
}


const Foo = {
    props: ['someArray', 'someArray2'],
    data: function () {
        return {
            fileData: fileData
        }
    },
    template: `
    <div>
        <h3>Foo</h3>
        <p>someArray passed as dynamic prop through 'router-view'-tag in the maintemplate:<br> {{ someArray }}</p>
        <p>someArray2 passed as static prop through routes configuration in VueRouter: <br>{{ someArray2 }}</p>
        <p>someArray passed as prop through 'router-view'-tag in the maintemplate:</p>
        <ul>
            <li v-for="item in someArray">{{ item }}</li>
        </ul>
        <p>Static data imported into vue from data.json</p>
        <ul>
            <li v-for="(item, index) in fileData" v-if="index < 5 ">{{ item }}</li>
        </ul>
    </div>`
}


const Bar = {
    template: `
        <div>
            <h3>Bar</h3>
            <p>Bar subpages menu</p>
            <ul id="inlinemenu">
                <li><router-link to="/bar/home">/bar/home</router-link></li>
                <li><router-link to="/bar/foo">/bar/foo</router-link></li>
                <li><router-link to="/bar/bar">/bar/bar</router-link></li>
            </ul>
            <router-view></router-view>
        </div>`
}

const BarHome = {template: `<div><h4>Bar home subpage</h4><p>Home page of the bars</p></div>`}

const BarFoo = {template: `<div><h4>BarFoo subpage</h4><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam ut iaculis risus. Duis ac pharetra magna, in pretium odio. Donec dignissim dolor eu arcu egestas, non interdum odio pharetra. Morbi nunc diam, congue elementum neque at, pulvinar pellentesque ante. Pellentesque tincidunt lorem a eros efficitur, posuere scelerisque augue suscipit.</p></div>`}

const BarBar = {template: `<div><h4>BarBar subpage</h4><p> Suspendisse vitae lacinia turpis. Vivamus nec tortor aliquet, dignissim mi ut, imperdiet arcu.  Aliquam eu maximus ligula. Vestibulum nec lectus faucibus, interdum turpis in, mollis metus. Suspendisse potenti. Suspendisse cursus nec erat in lobortis. Sed scelerisque non orci non euismod. Morbi blandit lacus ac facilisis condimentum. Ut vel pretium augue, vitae cursus nisi. Nullam sagittis, lorem id scelerisque porta, ligula tellus pretium metus, nec laoreet sapien sem vitae felis. Morbi ante magna, hendrerit ut ante in, sollicitudin accumsan est.</p></div>`}


const Page404 = {
    template: `
    <div>
        <h3>404</h3>
        <p>The requested URL can't be found</p>
    </div>    
    `
}

export { Title, Dice, Stamps, Foo, Bar, Page404, Routeinfo, BarHome ,BarBar, BarFoo };