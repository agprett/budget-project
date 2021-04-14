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
  }
}