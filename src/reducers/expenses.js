import { actionMode } from '../utils/expenses'

const expensesReducerDefaultState = []
const expensesReducer = (state = expensesReducerDefaultState, action) => {
    switch (action.type) {
        case actionMode.ADD_EXPENSE:
            return [
                ...state,
                action.expense
            ]
        case actionMode.REMOVE_EXPENSE:
            return state.filter( ({ id }) => id !== action.id )
        case actionMode.EDIT_EXPENSE:
            return state.map((expense) => {
                if (expense.id === action.id) {
                    return {
                        ...expense,
                        ...action.updates
                    }
                } else {
                    return expense
                } 
            })
        case actionMode.SET_EXPENSES: 
            return action.expenses
        default: 
            return state
    }
}

export default expensesReducer