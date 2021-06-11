const dayjs = require('dayjs')

module.exports = {
  getRecurring: async (req, res) => {
    const db = req.app.get('db')
    // const {user_id} = req.session.user
    const user_id = 1

    const recurring = await db.recurring.get_recurring([user_id])

    res.status(200).send(recurring)
  },

  newRecurring: async (req, res) => {
    const db = req.app.get('db')
    // const {user_id} = req.session.user
    const user_id = 1
    const {name, category, amount, date} = req.body

    await db.recurring.new_recurring([user_id, name, category, amount, date])

    res.sendStatus(200)
  },

  updateRecurring: async (req, res) => {
    const db = req.app.get('db')
    const {name, category, amount, date, recurring_id} = req.body

    await db.recurring.update_recurring([name, category, amount, date, recurring_id])

    res.sendStatus(200)
  },

  deleteRecurring: async (req, res) => {
    const db = req.app.get('db')
    const {id} = req.params

    await db.recurring.delete_recurring([id])

    res.sendStatus(200)
  },

  updateRecurringDate: async (req, res) => {
    const db = req.app.get('db')
    const {recurring_id, date} = req.body

    let updatedDate = dayjs(date).add(1, 'M')

    await db.recurring.update_date(recurring_id, updatedDate)

    res.sendStatus(200)
  }
}