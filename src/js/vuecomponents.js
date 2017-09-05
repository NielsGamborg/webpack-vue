
const title =  {
    props: ['title'],
    template:`
        <h3>{{ this.title }}</h3>
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
    props: ['stamps'],
    template:`
        <div>
            <table>
                <tbody>
                    <tr v-for="item in stamps">
                        <td>{{ item.time | toLocaleTime }}</td>
                        <td>{{ item.terminalName }}</td>
                        <td>{{ item.wintidStempKodeTekst }}</td>
                    </tr> 
                </tbody>   
            </table>
        </div>   
    `
}

export {title, button, table};