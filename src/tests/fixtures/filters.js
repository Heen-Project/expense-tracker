import moment from 'moment'

const actionMode = {
    SET_TEXT_FILTER: 'SET_TEXT_FILTER',
    SORT_BY_DATE: 'SORT_BY_DATE',
    SORT_BY_AMOUNT: 'SORT_BY_AMOUNT',
    SET_START_DATE: 'SET_START_DATE',
    SET_END_DATE: 'SET_END_DATE',
}

const filters = {
    text: '',
    sortBy: 'date',
    startDate: undefined,
    endDate: undefined
}

const altFilters = {
    text: 'Fee',
    sortBy: 'amount',
    startDate: moment(0).subtract(3, 'days'),
    endDate: moment(0).add(3, 'days')
}

export { actionMode, filters, altFilters }