const moment = require('moment')

module.exports = {
  getExpenses: async (req, res) => {
    const db = req.app.get('db')
    // const {user_id} = req.session.user
    const user_id = 1

    const expenses = await db.expenses.get_expenses([user_id])

    res.status(200).send(expenses)
  },
  
  newExpense: async (req, res) => {
    const db = req.app.get('db')
    const {name, category, amount} = req.body
    // const {user_id} = req.session.user
    const user_id = 1
    const date = moment().format()

    await db.expenses.new_expense([user_id, name, category, amount, date])
  
    res.sendStatus(200)
  },

  updateExpenses: async (req, res) => {
    const db = req.app.get('db')
    const {id} = req.params
    const {name, date, amount} = req.body

    await db.expenses.update_expense([name, date, amount, +id])

    res.sendStatus(200)
  },

  deleteExpense: async (req, res) => {
    const db = req.app.get('db')
    const {id} = req.params
    
    await db.expenses.delete_expense([+id])
    
    res.sendStatus(200)
  },

  getCurrent: async (req, res) => {
    const db = req.app.get('db')
    // const {user_id} = req.session.user
    const user_id = 1
  
    // let startWeek = moment().startOf('week').format()
    // let endWeek = moment().endOf('week').format()
    let startMonth = moment().startOf('month').format()
    let endMonth = moment().endOf('month').format()

    // let [weekly] = await db.expenses.get_weekly([user_id, startWeek, endWeek])
    let [monthly] = await db.expenses.get_monthly_spent([user_id, startMonth, endMonth])
  
    let current = {...monthly}
  
    res.status(200).send(current)
  }
}