Vue.component('about', {
    template: `
    <div>
        <div style="background-image: url(https://bit.ly/2V25Ljj); height: 75vh" 
        class="w-full bg-fixed bg-cover bg-no-repeat opacity-75 bg-scroll text-center">
            <h1 class="text-5xl md:text-6xl pt-3 text-gray-900">About this project</h1>
        </div>
        <div class="text-center text-purple-800">
            <div class="text-xl md:text-2xl pt-6 opacity-100">
                <p>Ever wanted to find quick and easy way to check<br> can you pay all bills you currently have with certain budgets?<br> Or to maintain how many of those bills expired?<br> If so, this app is for you!</p>
                <br> <br>
                <p>This is my first project, and I made it only to practice basics of Vue,<br> framework that I have recently picked up. I've learned a lot of things<br> building this app. The source code can be found <a class="text-blue-600" href="https://github.com/NinjaGamer107/BillTracker">here</a></p>
                <br>
            </div>
        </div>
    </div>
    `,
    data: function() {
        return {
            
        };
    }
})

Vue.component('add-bill', {
    template: `
    <form class="w-full max-w-lg m-auto mt-4" id="bill-form" @submit.prevent="sendBillSubmit">
        <h1 class="text-5xl md:text-6xl text-gray-700 text-center mb-4">Create a bill</h1>
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
                <input required v-model.number="money" min=1
                    class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-gray-100 focus:border-gray-500"
                    id="grid-zip" type="number" placeholder="100">
            </div>
        </div>
        <br>
        <div class="flex flex-row -mx-3 mb-6">
            <button form="bill-form"
                class="w-1/2 bg-purple-500 rounded px-3 py-2 m-auto hover:text-gray-200 focus:outline-none">
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
<div>
    <div v-show="!bills.length">
        <h1 class="text-5xl md:text-6xl text-gray-700 text-center mb-4">There's nothing here to show</h1>
        <div class="text-center text-purple-800">
            <div class="text-xl md:text-2xl pt-6">
                <p>Having trouble using this app? Just make a bill, and all your bills will appear<br> here along with control panel! From there, you should <br> be able to check everything you need :)</p>
                <br> <br>
                <p>This project was made with following technologies: <br></p>
                <ul class="list-disc">
                    <li>HTML5 for structuring the DOM</li>
                    <li>Vue.js for dynamicly displaying and showing everything</li>
                    <li>TailwindCSS to make styling so mych easier</li>
                </ul>
                <br>
            </div>
        </div>
    </div>
    <div v-if="bills.length">
        <div class="flex flex-wrap bg-gray-200 w-auto h-auto m-5 rounded-md text-gray-700 border border-purple-700">
        <div class="flex-auto">
            <div class="flex justify-center">
                <h1 class="flex-row text-center text-2xl text-gray-800">Control panel</h1>
                <button @click.prevent="updateButton()"
                    class="flex-row text-base text-gray-800 bg-purple-500 rounded px-1 mt-1 ml-3 hover:text-gray-200 focus:outline-none">
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
                <h3 v-if="(canPayBills != null) && canPayBills" class="flex-row text-base text-green-600">
                    You <b>can</b> pay all your bills with your budget
                </h3>
                <h3 v-else-if="(canPayBills != null) && !canPayBills" class="flex-row text-base text-red-600">
                    You <b>can't</b> pay all your bills with your budget
                </h3>
            </div>
            <div class="flex p-3 justify-center">
                <h3 v-if="(lateBills != null) && lateBills" class="flex-row text-base text-orange-600">
                    You already forgot to pay {{ lateBills }} bills!
                </h3>
                <h3 v-else-if="(lateBills != null) && !lateBills" class="flex-row text-base text-blue-600">
                    You still have time to pay your bills
                </h3>
            </div>
        </div>                     <!-- Editing panel here -->
            <div v-show="editingMode != false" class="flex-auto">
                <div class="p-1 text-center">
                    <p>Insert new name for the selected bill:</p>
                    <input v-model.lazy="bills[editIndexedBill].name" class="ml-2" type="text">
                </div>
                <div class="p-1 text-center">
                    <p>Insert new description for the selected bill:</p>
                    <input v-model.lazy="bills[editIndexedBill].description" class="ml-2" type="text">
                </div>
                <div class="p-1 text-center">
                    <p>Insert new date for the selected bill:</p>
                    <input v-model.lazy="bills[editIndexedBill].date" class="ml-2" type="date">
                </div>
                <div class="p-1 text-center">
                    <p>Insert new payment method for selected bill:</p>
                    <select v-model.lazy="bills[editIndexedBill].method"
                        class="ml-2"
                        id="grid-state">
                            <option selected="selected">Cash</option>
                            <option>Check</option>
                            <option>Online Payment</option>
                            <option>Automated phone call</option>
                            <option>Automated draft</option>
                    </select>
                </div>

                <div class="p-1 text-center">
                    <p>Insert amount of money for the selected bill:</p>
                    <input v-model.lazy.number="bills[editIndexedBill].money" class="ml-2" type="number" min=1>
                </div>
                <div class="p-1 text-center">
                    <button styles=""
                    @click="closeEditing">
                        Finish editing
                    </button>
                </div>
            </div>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 flex">
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
                            <span v-if="bill.expired && (bill.expired != null)"
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
                        <button @click="editBill(index)"
                            class="btn-gradient-default text-gray-800 font-medium text-sm py-1 px-5 rounded mr-3 hover:text-gray-200">Edit</button>
                        <button @click="removeBill(index)"
                            class="btn-gradient-default text-gray-800 font-medium text-sm py-1 px-5 rounded mr-3 hover:text-gray-200">Delete</button>
                    </div>
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
            allOwingMoney: null,
            editIndexedBill: 0,
            editingMode: false
        }
    },
    methods: {
        updateButton() {
            if(!this.editingMode) {
                this.findLateBills()
                this.doIhaveEnoughMoney()
            }
            else {
                alert('Please finish editing first')
            }
        },
        findLateBills() {
            if(this.checkLateBills) {
                this.lateBills = 0
                this.bills.forEach((bill)=>{
                    let today = new Date()
                    let date = new Date()

                    let stringyDate = bill.date
                    let y = parseInt(String(stringyDate).substring(0, 4))
                    let m = parseInt(String(stringyDate).substring(5, 7))-1
                    let d = parseInt(String(stringyDate).substring(8))

                    date.setDate(d)
                    date.setMonth(m)
                    date.setFullYear(y)
                    date.setHours(0)

                    if(date.getTime() >= today.getTime()) {
                        bill.expired = false
                    }
                    else {
                        bill.expired = true
                        this.lateBills += 1
                    }
                })
            }
            if(!this.checkLateBills) {
                this.lateBills = null
            }
        },
        doIhaveEnoughMoney() {
            if(this.budget != null) {
                this.allOwingMoney = 0
                this.bills.forEach((element)=>{
                    this.allOwingMoney += element.money
                })
            }
            else {
                alert('Insert your budget first!')
            }
        },
        removeBill(position) {
            if(this.editingMode == false) {
                this.bills.splice(position, 1)
            }
            else {
                alert('Please finish editing first!')
            }
        },
        editBill(position) {
            if(this.editingMode == false) {
                this.editingMode = true
                this.editIndexedBill = position
            }
            else {
                alert('In order to do that, please finish current process of editing')
            }
        },
        closeEditing() {
            this.editingMode =  false
        }
    },
    computed: {
        canPayBills() {
            if(this.budget != null && this.allOwingMoney != null) {
                return (this.budget >= this.allOwingMoney) ? true : false
            }
            else {
                return null
            }
        }
    },
})

Vue.component('contribute', {
    template: `
        <div>
            <h1 class="text-center text-4xl">Contribute</h1>
        </div>
    `
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
                // console.log(this.SelectedNavBar)
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