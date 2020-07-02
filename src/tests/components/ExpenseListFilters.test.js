import React from 'react'
import { shallow } from 'enzyme'
import { ExpenseListFilters } from '../../components/ExpenseListFilters'
import { filters, altFilters } from '../fixtures/filters'
import { DateRangePicker } from 'react-dates'
import moment from 'moment'

let setTextFilter, sortByDate, sortByAmount, setStartDate, setEndDate, wrapper

beforeEach(() => {
    setTextFilter = jest.fn()
    sortByDate = jest.fn()
    sortByAmount = jest.fn()
    setStartDate = jest.fn()
    setEndDate = jest.fn()
    wrapper = shallow(<ExpenseListFilters 
        filters={filters}
        setTextFilter={setTextFilter}
        sortByDate={sortByDate}
        sortByAmount={sortByAmount}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
        />)
})

test('render ExpenseListFilters', () => {
    expect(wrapper).toMatchSnapshot()
})

test('render ExpenseListFilters with alternative data', () => {
    wrapper.setProps({
        filters:{altFilters}
    })
    expect(wrapper).toMatchSnapshot()
})

test('handle text change', () => {
    const value = 'rent'
    wrapper.find('input').simulate('change', {
        target: { value }
    })
    expect(setTextFilter).toHaveBeenLastCalledWith(value)
})

test('sort by date', () => {
    const value = 'date'
    wrapper.setProps({
        filters:{altFilters}
    })
    wrapper.find('select').simulate('change', {
        target: { value }
    })
    expect(sortByDate).toHaveBeenLastCalledWith()
})

test('sort by amount', () => {
    const value = 'amount'
    wrapper.find('select').simulate('change', {
        target: { value }
    })
    expect(sortByAmount).toHaveBeenLastCalledWith()
})

test('handle date change', () => {
    const startDate = moment(0).add(1, 'years')
    const endDate = moment(0).add(2, 'years')
    wrapper.find(DateRangePicker).prop('onDatesChange')({ startDate, endDate })
    expect(setStartDate).toHaveBeenLastCalledWith(startDate)
    expect(setEndDate).toHaveBeenLastCalledWith(endDate)
})

test('handle date focus change', () => {
    const calendarFocused = 'endDate'
    wrapper.find(DateRangePicker).prop('onFocusChange')(calendarFocused)
    expect(wrapper.state('calendarFocused')).toBe(calendarFocused)
})