export default{
    el: '#app',
    data: {
        someArray: [2, 3, 5, 7, 11, 13, 13, 13, 17, 19],
        title: 'Testing vue, webpack and ecma script 6 imports',
    },
    methods: {
        testFunction: function() {
            console.log('this.someArray', this.someArray)
        },


    },
    created: function() {
        this.testFunction();
    }
}