/* External packages */
import _ from 'lodash'

/* Internal Vue stuff */
import {router} from './vueapp.js';

/* Bogus data when offline */
import fileData from './data.json';




const Title = {
    props: ['title'],
    template: `
        <h1>{{ this.title }}</h1>
    `,
}

const Page404 = { 
    template: `
    <div>
        <h3>404</h3>
        <p>The requested URL can't be found</p>
    </div>    
    `
}


const Home = { 
    props:['someArray'],
    template: `
    <div>
        <h3>Home</h3>
        <p>Somearray:</p>
        <p>{{ this.someArray }}</p>
        <ul>
            <li v-for="item in someArray">{{ item }}</li>
        </ul>
    </div>    
    `
}

const Foo = { props:['someArray','someArray2'], template: '<div><h3>Foo</h3><p>foo</p><p>someArray: {{ someArray }}</p><p>someArray2: {{ someArray2 }}</p></div>' }

const Bar = { template: '<div><h3>Bar</h3><p>bar</p></div>' }

const Table = {
    props: [],
    data: function () {
        return {
            stamps: {},
            user: '',
            stampNumbers: 20,
            stampType: '',
            url: '',
            error: false,
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
                        <!-- <tr v-for="(item, index) fileData" v-if="item.wintidStempKodeTekst.toLowerCase().includes(stampType)"> <!-- Use if offline -->
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
            if (this.user !== '' || this.user !== null) {
                this.getData();
            }
        }, 300)
    },
    methods: {
        getData: function () {
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
                //this.error = false; // Use if offline
            });
        }


    }
}


const Dice = {
    props: [],
    data: function () {
        return {
            outcome: '',
        }
    },
    template: `
        <div>
            <h3>Dice</h3>
            <button v-on:click="diceRoll()">Roll dice!</button>
            <p>{{ this.outcome }}</p>
        </div>    
    `,
    methods: {
        diceRoll: function () {
            this.outcome = Math.floor(Math.random() * 6 + 1);
        }
    }
}


export { Title, Dice, Table, Foo, Bar, Home, Page404 };