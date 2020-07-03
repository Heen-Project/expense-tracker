import React from 'react'
import { shallow } from 'enzyme'
import { ExpensesSummary } from '../../components/ExpensesSummary'

test('render ExpenseSummary with one expense', () => {
    const wrapper = shallow(<ExpensesSummary expenseCount={1} ExpensesTotal={195}/>)
    expect(wrapper).toMatchSnapshot()
})

test('render ExpenseSummary with multiple expenses', () => {
    const wrapper = shallow(<ExpensesSummary expenseCount={12} ExpensesTotal={11295}/>)
    expect(wrapper).toMatchSnapshot()
})