const moment = require('moment')

module.exports = {
  getExpenses: async (req, res) => {
    const db = req.app.get('db')
    // const {user_id} = req.session.user
    const user_id = 1

    const expenses = await db.expenses.get_expenses([user_id])

    res.status(200).send(expenses)
  },

  updateExpenses: async (req, res) => {
    const db = req.app.get('db')
    const {name, date_paid, amount} = req.body
    const {id} = req.params

    await db.expenses.update_expense([name, date_paid, amount, id])

    res.sendStatus(200)
  },

  addNew: async (req, res) => {
    const db = req.app.get('db')
    const {name, category, amount} = req.body
    // const {user_id} = req.session.user
    const user_id = 1
    const date = moment().format()

    await db.expenses.new_expense([user_id, name, category, amount, date])

    res.sendStatus(200)
  },

  getCurrent: async (req, res) => {
    const db = req.app.get('db')
    // const {user_id} = req.session.user
    const user_id = 1

    const date = moment().format('L')
    const today = new Date(date)
    let number = today.getDay()
    let sunday = moment(today).subtract(number, 'd').format('L')
    let monthNum = today.getDate()
    let month = moment(today).subtract(monthNum - 1, 'd').format('L')

    let [weekly] = await db.expenses.get_weekly([user_id, sunday, date])
    let [monthly] = await db.expenses.get_monthly([user_id, month, date])

    let current = {...weekly, ...monthly}

    res.status(200).send(current)
  },

  deleteExpense: async (req, res) => {
    const db = req.app.get('db')
    const {id} = req.params

    await db.expenses.delete_expense([+id])

    res.sendStatus(200)
  }
}