import { actionMode } from '../utils/filters'

const setTextFilter = (text = '') => ({
    type: actionMode.SET_TEXT_FILTER,
    text
})
const sortByAmount = () => ({
    type: actionMode.SORT_BY_AMOUNT
})
const sortByDate = () => ({
    type: actionMode.SORT_BY_DATE
})
const setStartDate = (startDate) => ({
    type: actionMode.SET_START_DATE,
    startDate
})
const setEndDate = (endDate) => ({
    type: actionMode.SET_END_DATE,
    endDate
})

export { setTextFilter, sortByAmount, sortByDate, setStartDate, setEndDate }