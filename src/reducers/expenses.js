const actionMode = {
    ADD_EXPENSE: 'ADD_EXPENSE',
    REMOVE_EXPENSE: 'REMOVE_EXPENSE',
    EDIT_EXPENSE: 'EDIT_EXPENSE',
}

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
        default: 
            return state
    }
}

export default expensesReducer