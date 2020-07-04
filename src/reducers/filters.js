import moment from 'moment'
import { actionMode } from '../utils/filters'

const filtersReducerDefaultState = {
    text: '',
    sortBy: 'date',
    startDate: moment().startOf('month'),
    endDate: moment().endOf('month')
}
const filtersReducer = (state = filtersReducerDefaultState, action) => {
    switch (action.type) {
        case actionMode.SET_TEXT_FILTER:
            return {
                ...state,
                text: action.text
            }
        case actionMode.SORT_BY_AMOUNT:
            return {
                ...state,
                sortBy: 'amount'
            }
        case actionMode.SORT_BY_DATE:
            return {
                ...state,
                sortBy: 'date'
            }
        case actionMode.SET_START_DATE:
            return {
                ...state,
                startDate: action.startDate
            }
        case actionMode.SET_END_DATE:
            return {
                ...state,
                endDate: action.endDate
            }
        default:
            return state
    }
}

export default filtersReducer