export default {
    el: '#app',
    data: {
        stamps: {},
        user: 'nig',
        someArray: [2, 3, 5, 7, 11, 13, 13, 13, 17, 19],
        title: 'Testing vue, webpack and ecma script 6 imports',
    },
    template: `
        <div class="wrapper"> 
            <header-box :title='title'></header-box>
            <table-box></table-box>
            <button-box></button-box>
        </div>
    `,
    methods: {
        testFunction: function () {
            console.log('this.someArray', this.someArray)
        }
    },
    created: function () {
        this.testFunction();
    }
}