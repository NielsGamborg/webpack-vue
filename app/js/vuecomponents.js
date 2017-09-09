/* External packages */
import _ from 'lodash'

/* Internal Vue stuff */
//import { router } from './vueapp.js';
//import { store } from './vueapp.js';

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
    computed: {
        pagecount() {
            return this.$store.state.pagecount;
        }
    },
    template: `
        <div id="routeinfo">
            <h3>Route info</h3>
            <p>Route change: {{this.pagecount}}</p>
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
    data: function() {
        return {
            routeTo: {},
            routeFrom: {},
        }
    },
    watch: {
        '$route' (to, from) {
            this.routeFrom = from;
            this.routeTo = to;
            this.$store.state.pagecount++;
        }
    },
    created: function() {
        this.routeTo = this.$router.app._route;
    },
}


const Stamps = {
    props: [],
    computed: {
        user() {
            return this.$store.state.user;
        }
    },
    data: function() {
        return {
            stamps: {},
            usermodel: this.$store.state.user,
            stampNumbers: 20,
            stampType: '',
            url: '',
            error: false,
            fileData: fileData
        }
    },
    template: `
        <div id="table-box">
            <h3>Ind og udstemplinger på SB</h3>
            <div id="userInput">
                Initialer: <input type="text "v-model="usermodel" v-on:keyup.enter="getData(usermodel)">
                Vis seneste: <select v-model="stampNumbers">
                    <option value="20">20</option> 
                    <option value="100">100</option> 
                    <option value="1000">Alle</option> 
                </select>
                <br>
                <br>
                Alle:<input type="radio" name="stampType" v-model="stampType" value="" /> 
                Ind:<input type="radio" name="stampType" v-model="stampType" value="ind" /> 
                Ud:<input type="radio" name="stampType" v-model="stampType" value="ud" /> 
                <button v-on:click="getData(usermodel)">Fetch data</button>
            </div>
            
            <div v-if="error && this.user.length > 1" class="error">
                <p>Username: "{{ user }}" doesn't exists in the spot service</p>
            </div>
            <template v-if="!error && this.user !== ''">    
                <table class="table">
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
    methods: {
        getData: function() {
            this.$store.state.user = this.usermodel;
            this.url = '/spot-service/spot/services/medarbejder/access/' + this.$store.state.user;
            this.$http.get(this.url).then(response => {
                this.stamps = response.body;
                this.error = false;
                console.log('response.body', response.body);
                /*this.$router.push({ //pushing user to URL if success
                    query: {
                        user: this.user,
                    }
                });*/
            }, response => {
                console.log('Error!', response);
                this.stamps = {};
                this.error = true; // Use if online
                /*  Use if offline
                this.error = false; 
                this.$router.push({ //pushing hardcoded user to URL if offline
                    query: {
                        user: this.user,
                    }
                });*/
            });
        }
    },
    created: function() {
        helloHelper("from 'Stamps' component in vuecomponents.js");
    }
}


const Dice = {
    props: [],
    computed: {
        count() {
            return this.$store.state.count
        },
        outcome() {
            return this.$store.state.outcome
        },
        outcome2() {
            return this.$store.state.outcome2
        },
        rolls() {
            return this.$store.state.rolls
        },
        rolls2() {
            return this.$store.state.rolls2
        },
        sum() {
            return this.$store.state.sum
        },
        sum2() {
            return this.$store.state.sum2
        }
    },
    template: `
        <div>
            <h3>Dices</h3>
            <table class="dicetable">
                <tr>
                    <td><button v-on:click="diceRoll()">Roll Vue dice</button></td>
                    <td class="result">{{ this.outcome }}</td>
                    <td>Total rolls: {{ this.rolls }}</td>
                    <td>Sum: {{ this.sum }}</td>
                    <td>Average: <span v-if='this.rolls > 0' >{{ +(this.sum / this.rolls).toFixed(2) }}</span></td>
                </tr>
                <tr>
                    <td><button v-on:click="diceRollImported()">Roll Vanilla dice</button></td>
                    <td class="result">{{ this.outcome2 }}</td>
                    <td>Total rolls: {{ this.rolls2 }}</td>
                    <td>Sum: {{ this.sum2 }} </td>
                    <td>Average: <span v-if='this.rolls2 > 0' >{{ +(this.sum2/ this.rolls2).toFixed(2) }}</span></td>
                </tr>
            </table>
            <div>
            <br><hr>
                <button v-on:click="counter()">+1</button> <button v-on:click="doublecounter()">+10</button><button v-on:click="resetcounter()">Reset</button>
                <p>{{this.count}}</p>
            </div>
        </div>    
    `,
    methods: {
        diceRoll: function() {
            //this.outcome = Math.floor(Math.random() * 6 + 1);
            this.$store.state.outcome = Math.floor(Math.random() * 6 + 1);
            this.$store.state.rolls++;
            this.$store.state.sum = this.$store.state.sum + this.$store.state.outcome;
            this.$router.push({
                query: {
                    vuedice: this.$store.state.outcome,
                    vanilladice: this.$store.state.outcome2,
                }
            });
        },
        diceRollImported: function() {
            //this.outcome2 = diceRollHelper();
            this.$store.state.outcome2 = diceRollHelper();
            this.$store.state.rolls2++;
            this.$store.state.sum2 = this.$store.state.sum2 + this.$store.state.outcome2;
            this.$router.push({
                query: {
                    vuedice: this.$store.state.outcome,
                    vanilladice: this.$store.state.outcome2,
                }
            });
        },
        counter: function() {
            this.$store.state.count++
        },
        doublecounter: function() {
            this.$store.commit('plus10')
        },
        resetcounter: function() {
            this.$store.commit('resetcounter');
            //this.$store.state.count = 0;
        }
    }
}


const Foo = {
    props: ['someArray', 'someArray2'],
    data: function() {
        return {
            fileData: fileData
        }
    },
    template: `
    <div>
        <h3>Foo</h3>
        
        <p><b>someArray</b> passed as prop through 'router-view'-tag in the maintemplate:</p>
        <ul>
            <li v-for="item in someArray">{{ item }}</li>
        </ul>

        <p><b>someArray2</b> passed as static prop through routes configuration in VueRouter: <br><br>{{ someArray2 }}</p>
        
        <p><b>Static data</b> imported into vue from data.json</p>
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

const BarHome = { template: `<div><h4>Bar home subpage</h4><p>Home page of the bars</p></div>` }

const BarFoo = { template: `<div><h4>BarFoo subpage</h4><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam ut iaculis risus. Duis ac pharetra magna, in pretium odio. Donec dignissim dolor eu arcu egestas, non interdum odio pharetra. Morbi nunc diam, congue elementum neque at, pulvinar pellentesque ante. Pellentesque tincidunt lorem a eros efficitur, posuere scelerisque augue suscipit.</p></div>` }

const BarBar = { template: `<div><h4>BarBar subpage</h4><p> Suspendisse vitae lacinia turpis. Vivamus nec tortor aliquet, dignissim mi ut, imperdiet arcu.  Aliquam eu maximus ligula. Vestibulum nec lectus faucibus, interdum turpis in, mollis metus. Suspendisse potenti. Suspendisse cursus nec erat in lobortis. Sed scelerisque non orci non euismod. Morbi blandit lacus ac facilisis condimentum. Ut vel pretium augue, vitae cursus nisi. Nullam sagittis, lorem id scelerisque porta, ligula tellus pretium metus, nec laoreet sapien sem vitae felis. Morbi ante magna, hendrerit ut ante in, sollicitudin accumsan est.</p></div>` }


const Page404 = {
    template: `
    <div>
        <h3>404</h3>
        <p>The requested URL can't be found</p>
    </div>    
    `
}

export { Title, Dice, Stamps, Foo, Bar, Page404, Routeinfo, BarHome, BarBar, BarFoo };