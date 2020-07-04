import moment from 'moment'

const actionMode = {
    ADD_EXPENSE: 'ADD_EXPENSE',
    REMOVE_EXPENSE: 'REMOVE_EXPENSE',
    EDIT_EXPENSE: 'EDIT_EXPENSE',
    SET_EXPENSES: 'SET_EXPENSES',
}

const expenses = [{
    id: '1',
    description: 'Candy',
    note: 'I like candy',
    amount: 100,
    createdAt: moment(0).valueOf()
}, {
    id: '2',
    description: 'Luxury Bag',
    note: 'This bag is so cool',
    amount: 15000,
    createdAt: moment(0).subtract(3, 'days').valueOf()
}, {
    id: '3',
    description: 'Online Shopping',
    note: 'Today is payday!',
    amount: 4500,
    createdAt: moment(0).add(3, 'days').valueOf()
}]

export { actionMode, expenses }