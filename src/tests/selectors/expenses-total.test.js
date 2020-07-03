import getExpenseTotal from  '../../selectors/expenses-total'
import { expenses } from '../fixtures/expenses'

test('return 0 if no expenses', () => {
    const result = getExpenseTotal([])
    expect(result).toBe(0)
})

test('add up single expense', () => {
    const result = getExpenseTotal([expenses[0]])
    expect(result).toBe(expenses[0].amount)
})

test('add up multiple expenses', () => {
    const result = getExpenseTotal(expenses)
    const sum = expenses.reduce((sum, value) => ({amount: sum.amount + value.amount}))
    expect(result).toBe(sum.amount)
})