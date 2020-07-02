import { addExpense, removeExpense, editExpense } from '../../actions/expenses'
import { actionMode } from '../fixtures/expenses'

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
    const expenseData = {
        description: 'House Rent',
        amount: 15000,
        createdAt: 1593591018206,
        note: 'This is rent fee'
    }
    const action  = addExpense(expenseData)
    expect(action).toEqual({
        type: actionMode.ADD_EXPENSE,
        expense: {
            ...expenseData,
            id: expect.any(String)
        }
    })
})

test('setup add expense action object with default value', () => {
    expect(addExpense()).toEqual({
        type: actionMode.ADD_EXPENSE,
        expense: {
            id: expect.any(String),
            description: '',
            note: '',
            amount: 0,
            createdAt: 0
        }
    })
})

