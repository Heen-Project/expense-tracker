import moment from 'moment'
import { setTextFilter, sortByAmount, sortByDate, setStartDate, setEndDate } from '../../actions/filters'
import { actionMode } from '../fixtures/filters'

test('generate set start date action object', () => {
    const timeUnix = 0
    const action  = setStartDate(moment(timeUnix))
    expect(action).toEqual({
        type: actionMode.SET_START_DATE,
        startDate: moment(timeUnix)
    })
})

test('generate set end date action object', () => {
    const timeUnix = 0
    const action  = setEndDate(moment(timeUnix))
    expect(action).toEqual({
        type: actionMode.SET_END_DATE,
        endDate: moment(timeUnix)
    })
})

test('generate set text filter object with provided value', () => {
    const text = 'Bill'
    const action  = setTextFilter(text)
    expect(action).toEqual({
        type: actionMode.SET_TEXT_FILTER,
        text
    })
})

test('generate set text filter object with default value', () => {
    expect(setTextFilter()).toEqual({
        type: actionMode.SET_TEXT_FILTER,
        text: ''
    })
})

test('generate action object for sort by date', () => {
    expect(sortByDate()).toEqual({
        type: actionMode.SORT_BY_DATE,
    })
})

test('generate action object for sort by amount', () => {
    expect(sortByAmount()).toEqual({
        type: actionMode.SORT_BY_AMOUNT,
    })
})