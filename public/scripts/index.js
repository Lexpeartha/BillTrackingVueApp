var eventBus = new Vue()

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
    <form class="w-full max-w-lg m-auto mt-8" id="bill-form" @submit.prevent="sendBillSubmit">
        <div class="flex flex-wrap -mx-3 mb-6">
            <div class="w-full px-3 mb-6 md:mb-0">
                <label class="block uppercase tracking-wide text-gray-700 text-center text-base font-bold mb-2" for="grid-bill-name">
                    Name of the expense
                </label>
                <input required v-model="name"
                    class="appearance-none block w-full bg-gray-200 text-gray-700 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-gray-100"
                    id="grid-first-name" type="text" placeholder="Bill for householding">
            </div>
        </div>
        <div class="flex flex-wrap -mx-3 mb-6">
            <div class="w-full px-3 mb-6 md:mb-0">
                <label class="block uppercase tracking-wide text-gray-700 text-center text-base font-bold mb-2" for="grid-bill-name">
                    Date of the deadline
                </label>
                <input required v-model="date"
                    class="appearance-none block w-full bg-gray-200 text-gray-700 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-gray-100"
                    id="grid-first-name" type="date" placeholder="12.09.2021">
            </div>
        </div>
        <div class="flex flex-wrap -mx-3 mb-6">
            <div class="w-full px-3 mb-6 md:mb-0">
                <label class="block uppercase tracking-wide text-gray-700 text-center text-base font-bold mb-2" for="grid-bill-name">
                    Additional notes/description
                </label>
                <textarea v-model="description"
                    class="appearance-none block w-full bg-gray-200 text-gray-700 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-gray-100"
                    id="grid-first-name" placeholder="Internet Cable bill">
                </textarea>
            </div>
        </div>
        <div class="flex flex-wrap -mx-3 mb-2">
            <div class="w-1/2 px-3 mb-6 md:mb-0">
                <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-state">
                    Method of payment
                </label>
                <div class="relative">
                    <select v-model="method"
                        class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-gray-100 focus:border-gray-500"
                        id="grid-state">
                        <option>Check</option>
                        <option>Online Payment</option>
                        <option>Automated phone call</option>
                        <option>Automated draft</option>
                    </select>
                    <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                    </div>
                </div>
            </div>
            <div class="w-1/2 px-3 mb-6 md:mb-0">
                <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-zip">
                    Bill Expense (in $)
                </label>
                <input required v-model.number="money"
                    class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-gray-100 focus:border-gray-500"
                    id="grid-zip" type="number" placeholder="100">
            </div>
        </div>
        <br>
        <div class="flex flex-row -mx-3 mb-6">
            <button form="bill-form"
                class="w-1/2 bg-purple-500 rounded px-3 py-2 m-auto">
                Add the bill
            </button>
        </div>
    </form>
    `,
    data: function() {
        return {
            name: null,
            description: null,
            date: null,
            method: null,
            money: null
        }
    },
    methods: {
        sendBillSubmit: function() {
            let newBill = {
                name: this.name,
                description: this.description,
                date: this.date,
                method: this.method,
                money: this.money
            }
            if(newBill.name && newBill.date && newBill.money) {
                this.$emit('send-bill', newBill)
            }
            else console.log('Please fill the form properly!')
        }
    }
})

Vue.component('view-bills', {
    props: {
        bills: {
            type: Array,
            required: true
        }
    },
    template: `
    <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 flex">
        <div v-show="!bills.length">
            <p class="text-center">Couldn't find any bills!</p>
        </div>
        <div v-for="(bill, index) in bills"
            class="max-w-sm rounded-lg overflow-hidden shadow-sm bg-purple-400 m-4">
            <div class="flex flex-col min-h-full">
            <div class="px-6 py-4 border-b border-gray-800">
                <div class="text-2xl text-center text-gray-800">{{ bill.name }}</div>
                <br>
                <div class="flex text-gray-700">
                    <p class="flex-row text-sm">Tags:</p>
                    <span v-if="bill.money != null"
                        class="inline-block bg-gray-200 rounded-full px-2 py-0 text-sm italic text-gray-700 mr-1 ml-1">{{ bill.money + '$' }}</span>
                    <span v-if="bill.method != null"
                        class="inline-block bg-gray-200 rounded-full px-2 py-0 text-sm italic text-gray-700 mr-1 ml-1">{{ bill.method }}</span>
                </div>
            </div>
            <div class="px-6 py-8 flex-grow">
                <p class="text-gray-700 text-left text-xl">
                    Description:
                </p>
                <p class="text-gray-700 text-base">
                    {{ bill.description }}
                </p>
            </div>
            <div class="px-6 py-8 flex-grow">
                <p class="text-gray-700 text-left text-xl">
                    The Bill is due:
                </p>
                <p class="text-gray-700 text-base">
                    {{ bill.date }}
                </p>
            </div>
            <div class="px-5 py-3 border-t border-gray-800 bg-purple-500 flex justify-end">
                <button class="btn-gradient-default text-gray-800 font-medium text-sm py-1 px-5 rounded mr-3 hover:text-gray-200">Edit</button>
                <button class="btn-gradient-default text-gray-800 font-medium text-sm py-1 px-5 rounded mr-3 hover:text-gray-200">Delete</button>
            </div>
            </div>
        </div>
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
        Bills: []
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
        },
        addToBills(newBill) {
            this.Bills.push(newBill)
            alert('Bill has been added successfully!')
        }
    }
})