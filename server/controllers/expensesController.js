const moment = require('moment')

module.exports = {
  getExpenses: async (req, res) => {
    const db = req.app.get('db')
    const id = 1

    const expenses = await db.expenses.get_expenses([id])

    res.status(200).send(expenses)
  },

  updateExpenses: async (req, res) => {
    const db = req.app.get('db')
    const {name, category, amount} = req.body
    const {id} = req.params

    await db.expenses.update_expense([name, category, amount, id])

    res.sendStatus(200)
  },

  getRecent: async (req, res) => {
    const db = req.app.get('db')
    const id = 1

    const recent = await db.expenses.get_recent([id])

    res.status(200).send(recent)
  },

  quickAdd: async (req, res) => {
    const db = req.app.get('db')
    const {name, category, amount} = req.body
    const id = 1

    await db.expenses.new_expense([id, name, category, amount])

    res.sendStatus(200)
  },

  addNew: async (req, res) => {
    const db = req.app.get('db')
    const {name, category, amount} = req.body
    const id = 1
    const date = moment().format()

    await db.expenses.new_expense([id, name, category, amount, date])

    res.sendStatus(200)
  },

  getCondensed: async (req, res) => {
    const db = req.app.get('db')
    const id = 1

    let [condensed] = await db.expenses.get_condensed([id])

    delete condensed.condensed_id
    delete condensed.user_id

    console.log(condensed)

    res.status(200).send(condensed)
  },

  getCurrent: async (req, res) => {
    const db = req.app.get('db')
    const id = 1

    const date = moment().format('L')
    const today = new Date(date)
    let number = today.getDay()
    let sunday = moment(today).subtract(number, 'd').format('L')
    let monthNum = today.getDate()
    let month = moment(today).subtract(monthNum - 1, 'd').format('L')

    let [weekly] = await db.expenses.get_weekly([id, sunday, date])
    let [monthly] = await db.expenses.get_monthly([id, month, date])

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