module.exports = {
  getBudget: async (req, res) => {
    const db = req.app.get('db')
    // const {user_id} = req.session.user
    const user_id = 1

    let budget = await db.budget.get_budget([user_id])

    res.status(200).send(budget)
  },

  updateBudget: async (req, res) => {
    const db = req.app.get('db')
    const {monthly} = req.body
    // const {user_id} = req.session.user
    const user_id = 1

    await db.budget.update_budget([monthly, user_id])

    res.sendStatus(200)
  },

  
}