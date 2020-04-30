module.exports = {
  getBudget: async (req, res) => {
    const db = req.app.get('db')
    const id = 1

    const [budget] = await db.budget.get_budget([id])

    res.status(200).send(budget)
  },

  updateBudget: async (req, res) => {
    const db = req.app.get('db')
    const {monthly, entertainment, personalCare, groceries, travel, other} = req.body
    const id = 1

    await db.budget.update_budget([monthly, entertainment, personalCare, groceries, travel, other, id])

    res.sendStatus(200)
  }
}