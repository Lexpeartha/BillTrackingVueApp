const app = new Vue({
    el: '#app',
    data: {
        NavBarElements: [ 'About', 'Create a bill', 'View your bills'],
        SelectedNavBar: 'About'
    },
    methods: {
        updateNav(index) {
            this.SelectedNavBar = this.NavBarElements[index]
            console.log(this.SelectedNavBar)
        }
    }
})