/* External packages */
import _ from 'lodash'

/* Bogus data when off line */
import fileData from './data.json';

const title =  {
    props: ['title'],
    template:`
        <h1>{{ this.title }}</h1>
    `,
}

const button =  {
    props: [],
    data: function(){
        return{
            outcome: '',
        }
    },
    template:`
        <div>
            <button v-on:click="diceRoll()">Roll!</button>
            <p>{{ this.outcome }}</p>
        </div>    
    `,
    methods: {
        diceRoll: function() {
            this.outcome = Math.floor(Math.random() * 6 + 1);
        }
    }
}

const table =  {
    props: [],
    data: function(){
        return{
            stamps: {},
            user: '',
            stampType: '',
            url: '',
            error: false,
            fileData: fileData
        }
    },
    template:`
        <div id="table-box">
            <h3>Stemplinger for {{ user }}</h3>
            <div id="typePicker">
                Initialer: <input type="text "v-model="user" v-on:keyup.enter="gogetit()">
                Alle:<input type="radio" name="stampType" v-model="stampType" value="" /> 
                Ind:<input type="radio" name="stampType" v-model="stampType" value="ind" /> 
                Ud:<input type="radio" name="stampType" v-model="stampType" value="ud" /> 
                <button v-on:click="gogetit()">Fetch data</button>
            </div>
            
            <div v-if="error && this.user !== ''" class="error">
                <p>Username: "{{ user }}" doesn't exists in the spot service</p>
            </div>
            <template v-if="!error && this.user !== ''">    
                <table>
                    <tbody>
                        <tr v-for="item in stamps" v-if="item.wintidStempKodeTekst.toLowerCase().includes(stampType)"> <!-- Use if online -->
                        <!-- <tr v-for="item in fileData" v-if="item.wintidStempKodeTekst.toLowerCase().includes(stampType)"> <!-- Use if offline -->
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
            if(this.user !== '' || this.user !== null){
                this.gogetit();
            }                   
        }, 500)
    },
    methods: {
        gogetit: function () {
            this.url = '/spot-service/spot/services/medarbejder/access/' + this.user;
            this.$http.get(this.url).then(response => {
                this.stamps = response.body;
                this.error = false;
                console.log('response.body', response.body);
            }, response => {
                console.log('Error!', response);
                this.error = true; // Use if online
                //this.error = false; // Use if offline
            });
        }


    },
    created: function () {
        //this.gogetit();
    }
}

export {title, button, table};