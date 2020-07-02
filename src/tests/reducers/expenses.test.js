import expensesReducer from '../../reducers/expenses'
import { actionMode, expenses } from '../fixtures/expenses'

const [ exp1, exp2, exp3 ] = expenses

test('set default state', () => {
    const state = expensesReducer(undefined, { type: '@@INIT' })
    expect(state).toEqual([])
})

test('remove expense by id', () => {
    const action = {
        type: actionMode.REMOVE_EXPENSE,
        id: exp2.id
    }
    const state = expensesReducer(expenses, action)
    expect(state).toEqual([exp1, exp3])
})

test('remove expense failed, due to id not found', () => {
    const action = {
        type: actionMode.REMOVE_EXPENSE,
        id: '-1'
    }
    const state = expensesReducer(expenses, action)
    expect(state).toEqual([exp1, exp2, exp3])
})


test('add an expense', () => {
    const expense = {
        id: '4',
        description: 'Education',
        note: 'College fee',
        amount: 40000,
        createdAt: 2000000
    }
    const action = {
        type: actionMode.ADD_EXPENSE,
        expense
    }
    const state = expensesReducer(expenses, action)
    expect(state).toEqual([
        ...expenses,
        expense
    ])
})

test('edit expense', () => {
    const amount = 7777
    const action = {
        type: actionMode.EDIT_EXPENSE,
        id: exp2.id,
        updates: {
            amount
        }
    }
    const state = expensesReducer(expenses, action)
    expect(state[1].amount).toBe(amount)
})

test('edit expense failed, due to id not found', () => {
    const amount = 7777 
    const action = {
        type: actionMode.EDIT_EXPENSE,
        id: '-1',
        updates: {
            amount
        }
    }
    const state = expensesReducer(expenses, action)
    expect(state).toEqual(expenses)
})