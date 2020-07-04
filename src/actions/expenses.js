import { v4 as uuidv4 } from 'uuid'
import database from '../firebase/firebase'

const actionMode = {
    ADD_EXPENSE: 'ADD_EXPENSE',
    REMOVE_EXPENSE: 'REMOVE_EXPENSE',
    EDIT_EXPENSE: 'EDIT_EXPENSE',
}

const addExpense = (expense) => ({
    type: actionMode.ADD_EXPENSE,
    expense
})

const startAddExpense = (expenseData = {}) => {
    return (dispatch) => {
        const {
            description = '',
            note = '',
            amount = 0,
            createdAt = 0
        } = expenseData
        const expense = { description, note, amount, createdAt }
        return database.ref('expenses').push(expense).then((ref) => {
            dispatch(addExpense({
                id: ref.key,
                ...expense
            }))
        })
    }
}

const removeExpense = ({
    id
} = {}) => ({
    type: actionMode.REMOVE_EXPENSE,
    id
})

const editExpense = (id, updates) => ({
    type: actionMode.EDIT_EXPENSE,
    id,
    updates
})

export { addExpense, removeExpense, editExpense, startAddExpense }