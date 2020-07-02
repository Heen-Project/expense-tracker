import { v4 as uuidv4 } from 'uuid'

const actionMode = {
    ADD_EXPENSE: 'ADD_EXPENSE',
    REMOVE_EXPENSE: 'REMOVE_EXPENSE',
    EDIT_EXPENSE: 'EDIT_EXPENSE',
}

const addExpense = ({
    description = '',
    note = '',
    amount = 0,
    createdAt = 0
} = {}) => ({
    type: actionMode.ADD_EXPENSE,
    expense: {
        id: uuidv4(),
        description,
        note,
        amount,
        createdAt
    }
})
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

export { addExpense, removeExpense, editExpense }