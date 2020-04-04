Vue.component('about', {
    template: `
        <div>
            <h1 class="text-center text-gray-700 text-4xl">About this project</h1>
            <img src="https://bit.ly/3bPeps7" class="w-2/3 m-auto lg:w-1/2"/>
            <br>
            <p class="text-center text-gray-700">
                This project has been made solely for educational purposes.<br>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.<br>
                Libero nulla quia, nemo aspernatur, cupiditate error tenetur<br>
                dolore ex iusto rem maxime soluta aliquam voluptatem praesentium neque, <br>molestiae provident repellat ut!
            </p>
        </div>
    `,
    methods: {
        
    }
})

Vue.component('add-bill', {
    template: `
        <div>
            <h1 class="text-center text-4xl">Create a bill</h1>
        </div>
    `,
    methods: {

    }
})

Vue.component('view-bills', {
    template: `
        <div>
            <h1 class="text-center text-4xl">View your bills</h1>
        </div>
    `,
    methods: {

    }
})

Vue.component('contribute', {
    template: `
        <div>
            <h1 class="text-center text-4xl">Contribute</h1>
        </div>
    `,
    methods: {

    }
})

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
                name: 'Contribute',
                isDisabled: true
            }
        ],
        SelectedNavBar: 'About',
        Bills: [],
        currentBill: {
            name: null,
            date: null,
            description: null,
            method: null,
            payment: null
        }
    },
    methods: {
        updateNav(index, object) {
            if(object.isDisabled)
                return
            else {
                this.SelectedNavBar = this.NavBarElements[index].name
                console.log(this.SelectedNavBar)
            }
        },
        showFromNavSelection(comp) {
            if(this.SelectedNavBar == comp)
                return true
            return false
        }
    }
})