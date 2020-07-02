import moment from 'moment'
import filtersReducer from '../../reducers/filters'
import { actionMode } from '../fixtures/filters'

test('setup default filter values', () => {
    const state = filtersReducer(undefined, { type: '@@INIT' })
    expect(state).toEqual({
        text: '',
        sortBy: 'date',
        startDate: moment().startOf('month'),
        endDate: moment().endOf('month')
    })
})

test('set sortBy to amount', () => {
    const state = filtersReducer(undefined, { type: actionMode.SORT_BY_AMOUNT })
    expect(state.sortBy).toBe('amount')
})

test('set sortBy to date', () => {
    const currentState = {
        text: '',
        startDate: undefined,
        endDate: undefined,
        sortBy: 'amount',
    }
    const action = { type: actionMode.SORT_BY_DATE }
    const state = filtersReducer(currentState, action)
    expect(state.sortBy).toBe('date')
})


test('set text filter', () => {
    const text = 'Text Filter'
    const action = {
        type: actionMode.SET_TEXT_FILTER,
        text
    }
    const state = filtersReducer(undefined, action)
    expect(state.text).toBe(text)
})

test('set startDate filter', () => {
    const startDate = moment().valueOf()
    const action = {
        type: actionMode.SET_START_DATE,
        startDate
    }
    const state = filtersReducer(undefined, action)
    expect(state.startDate).toBe(startDate)
})

test('set endDate filter', () => {
    const endDate = moment().valueOf()
    const action = {
        type: actionMode.SET_END_DATE,
        endDate
    }
    const state = filtersReducer(undefined, action)
    expect(state.endDate).toBe(endDate)
})