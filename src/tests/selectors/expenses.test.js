import moment from 'moment'
import selectExpenses from '../../selectors/expenses'
import { expenses } from '../fixtures/expenses'

test('filter by text value', () => {
    const [ exp1, exp2, exp3 ] = expenses
    const filters = {
        text: 'a',
        sortBy: 'date',
        startDate: undefined,
        endDate: undefined
    }
    const result = selectExpenses(expenses, filters)
    expect(result).toEqual([exp1, exp2]);
})

test('filter by startDate', () => {
    const [ exp1, exp2, exp3 ] = expenses
    const filters = {
        text: '',
        sortBy: 'date',
        startDate: moment(0),
        endDate: undefined
    }
    const result = selectExpenses(expenses, filters)
    expect(result).toEqual([exp3, exp1]);
})

test('filter by endDate', () => {
    const [ exp1, exp2, exp3 ] = expenses
    const filters = {
        text: '',
        sortBy: 'date',
        startDate: undefined,
        endDate: moment(0).add(2, 'days')
    }
    const result = selectExpenses(expenses, filters)
    expect(result).toEqual([exp1, exp2]);
})

test('sort by date', () => {
    const [ exp1, exp2, exp3 ] = expenses
    const filters = {
        text: '',
        sortBy: 'date',
        startDate: undefined,
        endDate: undefined
    }
    const result = selectExpenses(expenses, filters)
    expect(result).toEqual([exp3, exp1, exp2]);
})

test('sort by amount', () => {
    const [ exp1, exp2, exp3 ] = expenses
    const filters = {
        text: '',
        sortBy: 'amount',
        startDate: undefined,
        endDate: undefined
    }
    const result = selectExpenses(expenses, filters)
    expect(result).toEqual([exp2, exp3, exp1]);
})