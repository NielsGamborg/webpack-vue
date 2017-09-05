export default {
    el: '#app',
    data: {
        stamps: {},
        someArray: [2, 3, 5, 7, 11, 13, 13, 13, 17, 19],
        title: 'Testing vue, webpack and ecma script 6 imports',
    },
    template: `
        <div class="wrapper"> 
            <header-box :title='title'></header-box>
            <button-box></button-box>
            <list-box :stamps="stamps"></list-box>
        </div>
    `,
    methods: {
        testFunction: function () {
            console.log('this.someArray', this.someArray)
        },
        gogetit: function () {
            this.$http.get('/spot-service/spot/services/medarbejder/access/nig').then(response => {
                this.stamps = response.body;
                //this.someData = response.body;
                console.log('response.body', response.body);
            }, response => {
                console.log('Error!');
            });
        }


    },
    created: function () {
        this.testFunction();
        this.gogetit();
    }
}