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
                        <option>Cash</option>
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
            money: null,
            expired: null
        }
    },
    methods: {
        sendBillSubmit: function() {
            let newBill = {
                name: this.name,
                description: this.description,
                date: this.date,
                method: this.method,
                money: this.money,
                expired: this.expired
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
    <div v-if="bills.length">
        <div class="bg-gray-200 w-23/24 h-auto md:h-56 m-5 rounded-md text-gray-700 border border-purple-700">
            <div class="flex justify-center">
                <h1 class="flex-row text-center text-2xl text-gray-800">Control panel</h1>
                <button @click.prevent="findLateBills(); doIhaveEnoughMoney();"
                    class="flex-row text-base text-gray-800 px-4 h-6 align-middle text-gray-700 bg-gray-400 m-2 ml-4 border border-purple-700 hover:text-gray-200 hover:bg-gray-500 rounded-md">
                    Update
                </button>
            </div>
            <div class="flex p-3 justify-center">
                <p class="flex-row text-sm mr-3">Enter your budget:</p>
                <input required type="number" v-model.number="budget" placeholder="100$" class="bg-gray-100 focus:outline-none focus:bg-white" />
            </div>
            <div class="flex p-3 justify-center">
                <p class="flex-row text-sm mr-3">Take into consideration the date?</p>
                <input type="radio" id="yes" class=""
                v-model="checkLateBills" v-bind:value="true"/>
                <p class="ml-1 mr-1">Yes</p>
                <input type="radio" checked id="no" class=""
                v-model="checkLateBills" v-bind:value="false"/>
                <p class="ml-1 mr-1">No</p>
            </div>
            <div class="flex p-3 justify-center">
                <h3 v-if="canPayBills" class="flex-row text-base text-green-600">
                    You <b>can</b> pay all your bills with your budget
                </h3>
                <h3 v-else class="flex-row text-base text-red-600">
                    You <b>can't</b> pay all your bills with your budget
                </h3>
            </div>
            <div class="flex p-3 justify-center">
                <h3 v-if="lateBills" class="flex-row text-base text-orange-600">
                    You already forgot to pay {{ lateBills }} bills!
                </h3>
                <h3 v-else class="flex-row text-base text-blue-600">
                    You still have time to pay your bills
                </h3>
            </div>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 flex">
            <!--
            <div v-show="!bills.length">
                <p class="text-center">Couldn't find any bills!</p>
            </div>
            -->
            <div v-for="(bill, index) in bills"
                class="max-w-sm rounded-lg overflow-hidden shadow-sm bg-purple-400 m-4 justify-around">
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
                            <span v-if="bill.expired == false && bill.expired != null"
                                class="inline-block bg-red-500 rounded-full px-2 py-0 text-sm italic text-gray-800 mr-1 ml-1">Late!</span>
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
                        <button
                            class="btn-gradient-default text-gray-800 font-medium text-sm py-1 px-5 rounded mr-3 hover:text-gray-200">Edit</button>
                        <button
                            class="btn-gradient-default text-gray-800 font-medium text-sm py-1 px-5 rounded mr-3 hover:text-gray-200">Delete</button>
                    </div>
                </div>
            </div>
    
        </div>
    </div>
    `,
    data: function() {
        return {
            lateBills: null,
            checkLateBills: false,
            budget: null,
            canPayBills: null
        }
    },
    methods: {
        findLateBills() {
            if(this.checkLateBills && this.bills.length) {
                this.lateBills = 0
                let currentDate = new Date()

                this.bills.forEach((bill)=>{
                    let currentDate = new Date()
                    let date = new Date()

                    let stringyDate = bill.date
                    let y = parseInt(String(stringyDate).substring(0, 4))
                    let m = parseInt(String(stringyDate).substring(5, 7))-1
                    let d = parseInt(String(stringyDate).substring(8))

                    date.setDate(d)
                    date.setMonth(m)
                    date.setFullYear(y)
                    date.setHours(0)

                    if(currentDate.getTime() >= date.getTime()) {
                        bill.expired = false
                    }
                    else {
                        bill.expired = true
                        this.lateBills += 1
                    }
                })
            }
            else {
                return
            }
        },
        doIhaveEnoughMoney() {
            let allOwingMoney = 0
            this.budget = 0
            this.bills.forEach((element)=>{
                allOwingMoney += element.money
            })
            if(this.bills.length) {
                /* Worse version of the code below
                this.budget >= allOwingMoney ?
                this.canPayBills = true :
                this.canPayBills = false */
                this.canPayBills = (this.budget >= allOwingMoney) ? true : false
            }
        }
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