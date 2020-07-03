export default (expenses) => {
    return expenses.map((expense) => expense.amount).reduce((sum, value) => sum+value, 0)
    // return expenses.reduce((sum, value) => ({amount: sum.amount + value.amount})).amount
}