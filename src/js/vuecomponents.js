let title =  {
    props: ['title'],
    template:`
        <h3>{{ this.title }}</h3>
    `,
}

let button =  {
    props: [],
    data: function(){
        return{
            outcome: '',
        }
    },
    template:`
        <div>
            <button v-on:click="diceRoll()">Go!</button>
            <span>{{ this.outcome }}</span>
        </div>    
    `,
    methods: {
        diceRoll: function() {
            this.outcome = Math.floor(Math.random() * 6 + 1);
        }
    }
}

export {title, button};