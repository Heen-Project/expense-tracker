import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { addExpense, removeExpense, editExpense, startAddExpense } from '../../actions/expenses'
import { actionMode, expenses } from '../fixtures/expenses'
import database from '../../firebase/firebase'

const createMockStore = configureMockStore([thunk])

test('setup remove expense action object', () => {
    const id = 'uniqueid'
    const action  = removeExpense({ id })
    expect(action).toEqual({
        type: actionMode.REMOVE_EXPENSE,
        id
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

test('setup add expense action object with provided value', () => {
    const action  = addExpense(expenses[2])
    expect(action).toEqual({
        type: actionMode.ADD_EXPENSE,
        expense: expenses[2]
    })
})

test('add expense to database and store', (done) => {
    const store = createMockStore({})
    const expenseData =  expenses[1]
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
        return database.ref(`expenses/${actions[0].expense.id}`).once('value')
    }).then((snapshot) => {
        expect(snapshot.val()).toEqual(expenseData)
        done()
    })
})

test('add expense with defaults to database and store', (done) => {
    const store = createMockStore({})
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
        return database.ref(`expenses/${actions[0].expense.id}`).once('value')
    }).then((snapshot) => {
        expect(snapshot.val()).toEqual(expenseDefaults)
        done()
    })
})

// test('setup add expense action object with default value', () => {
//     expect(addExpense()).toEqual({
//         type: actionMode.ADD_EXPENSE,
//         expense: {
//             id: expect.any(String),
//             description: '',
//             note: '',
//             amount: 0,
//             createdAt: 0
//         }
//     })
// })

