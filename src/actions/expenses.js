import database from '../firebase/firebase'
import { actionMode } from '../utils/expenses'

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

const startRemoveExpense = ({ id }) => {
    return (dispatch) => {
        return database.ref(`expenses/${id}`).remove().then(() => {
            dispatch(removeExpense({ id }))
        })
    }
}


const editExpense = (id, updates) => ({
    type: actionMode.EDIT_EXPENSE,
    id,
    updates
})

const startEditExpense = (id, updates) => {
    return (dispatch) => {
        return database.ref(`expenses/${id}`).update(updates).then(() => {
            dispatch(editExpense(id, updates))
        })
    }
}

const setExpenses = (expenses) => ({
    type: actionMode.SET_EXPENSES,
    expenses
})

const startSetExpenses = () => {
    return (dispatch) => {
        return database.ref('expenses').once('value').then((snapshot) => {
            const expenses = []
            snapshot.forEach((childSnapshot) => {
                expenses.push({
                    id: childSnapshot.key,
                    ...childSnapshot.val()
                })
            })
            dispatch(setExpenses(expenses))
        })
    }
}

export { addExpense, 
    startAddExpense, 
    removeExpense, 
    startRemoveExpense, 
    editExpense, 
    startEditExpense, 
    setExpenses,
    startSetExpenses
}