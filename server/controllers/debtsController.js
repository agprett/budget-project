module.exports = {
  newDebt: async (req, res) => {
    const db = req.app.get('db')
    // const {user_id} = req.session.user
    const user_id = 1
    const {total, monthly, due} = req.body

    await db.debts.new_debt([user_id, total, monthly, due])

    res.sendStatus(200)
  },

  getDebts: async (req, res) => {
    const db = req.app.get('db')
    // const {user_id} = req.session.user
    const user_id = 1
    
    const debts = await db.debts.get_debts(user_id)

    res.status(200).send(debts)
  },

  updateDebts: async (req, res) => {
    const db = req.app.get('db')
    const {id} = req.params
    const {total, monthly, paid, due} = req.body

    const [debt] = await db.debts.update_debts([+id, total, monthly, paid, due])

    res.status(200).send(debt)
  }
}