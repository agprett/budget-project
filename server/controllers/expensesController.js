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
  }
}