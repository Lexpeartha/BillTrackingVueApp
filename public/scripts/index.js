const app = new Vue({
    el: '#app',
    data: {
        NavBarElements: [
            {
                name: 'About',
                isDisabled: false
            },
            {
                name: 'Create a bill',
                isDisabled: false
            },
            {
                name: 'View your bills',
                isDisabled: false
            },
            {
                name: 'Contribute to this project',
                isDisabled: true
            }
        ],
        SelectedNavBar: 'About'
    },
    methods: {
        updateNav(index) {
            this.SelectedNavBar = this.NavBarElements[index].name
            console.log(this.SelectedNavBar)
        }
    }
})