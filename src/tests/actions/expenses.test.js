import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { addExpense, 
    startAddExpense, 
    removeExpense, 
    startRemoveExpense, 
    editExpense, 
    startEditExpense, 
    setExpenses, 
    startSetExpenses } from '../../actions/expenses'
import { actionMode, expenses } from '../fixtures/expenses'
import database from '../../firebase/firebase'

const uid = 'expense-tracker-uid'
const defaultAuthState = { auth: { uid } }
const createMockStore = configureMockStore([thunk])

beforeEach((done) => {
    const expensesData = {}
    expenses.forEach(({ id, description, note, amount, createdAt }) => {
        expensesData[id] = {description, note, amount, createdAt}
    })
    database.ref(`users/${uid}/expenses`).set(expensesData).then(() => done())
})

test('setup remove expense action object', () => {
    const id = 'uniqueid'
    const action  = removeExpense({ id })
    expect(action).toEqual({
        type: actionMode.REMOVE_EXPENSE,
        id
    })
})

test('setup remove expense from firebase', (done) => {
    const store = createMockStore(defaultAuthState)
    const id = expenses[2].id
    store.dispatch(startRemoveExpense({ id })).then(() => {
        const actions = store.getActions()
        expect(actions[0]).toEqual({
            type: actionMode.REMOVE_EXPENSE,
            id
        })
        return database.ref(`users/${uid}/expenses/${id}`).once('value')
    }).then((snapshot) => {
        expect(snapshot.val()).toBeFalsy()
        done()
    })
})


test('setup edit expense action object', () => {
    const id = 'uniqueid'
    const note = 'text'
    const action  = editExpense(id, { note })
    expect(action).toEqual({
        type: actionMode.EDIT_EXPENSE,
        id,
        updates: {
            note
        }
    })
})

test('setup edit expense from firebase', (done) => {
    const store = createMockStore(defaultAuthState)
    const id = expenses[0].id
    const updates = {amount: 777}
    store.dispatch(startEditExpense(id, updates)).then(() => {
        const actions = store.getActions()
        expect(actions[0]).toEqual({
            type: actionMode.EDIT_EXPENSE,
            id,
            updates
        })
        return database.ref(`users/${uid}/expenses/${id}`).once('value')
    }).then((snapshot) => {
        expect(snapshot.val().amount).toBe(updates.amount)
        done()
    })
})

test('setup add expense action object with provided value', () => {
    const action  = addExpense(expenses[2])
    expect(action).toEqual({
        type: actionMode.ADD_EXPENSE,
        expense: expenses[2]
    })
})

test('add expense to database and store', (done) => {
    const store = createMockStore(defaultAuthState)
    const expenseData =  Object.assign({}, expenses[1]);
    delete expenseData.id;
    store.dispatch(startAddExpense(expenseData)).then(() => {
        const actions = store.getActions()
        expect(actions[0]).toEqual({
            type: actionMode.ADD_EXPENSE,
            expense: {
                ...expenseData,
                id: expect.any(String)
            }
        })
        return database.ref(`users/${uid}/expenses/${actions[0].expense.id}`).once('value')
    }).then((snapshot) => {
        expect(snapshot.val()).toEqual(expenseData)
        done()
    })
})

test('add expense with defaults to database and store', (done) => {
    const store = createMockStore(defaultAuthState)
    const expenseDefaults =  {
        description: '',
        amount: 0,
        note: '',
        createdAt: 0
    }
    store.dispatch(startAddExpense({})).then(() => {
        const actions = store.getActions()
        expect(actions[0]).toEqual({
            type: actionMode.ADD_EXPENSE,
            expense: {
                ...expenseDefaults,
                id: expect.any(String)
            }
        })
        return database.ref(`users/${uid}/expenses/${actions[0].expense.id}`).once('value')
    }).then((snapshot) => {
        expect(snapshot.val()).toEqual(expenseDefaults)
        done()
    })
})

test('setup set expense action object with date', () => {
    const action = setExpenses(expenses)
    expect(action).toEqual({
        type: actionMode.SET_EXPENSES,
        expenses
    })
})

test('fetch the expenses from firebase', (done) => {
    const store = createMockStore(defaultAuthState)
    store.dispatch(startSetExpenses()).then(() => {
        const actions = store.getActions()
        expect(actions[0]).toEqual({
            type: actionMode.SET_EXPENSES,
            expenses
        })
        done()
    })
})