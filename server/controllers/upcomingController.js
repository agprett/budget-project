module.exports = {
  getUpcoming: async (req, res) => {
    const db = req.app.get('db')
    const {user_id} = req.session.user
    // const user_id = 1

    let upcomingPayments = await db.upcoming.get_upcoming([user_id])

    res.status(200).send(upcomingPayments)
  },

  newUpcoming: async (req, res) => {
    const db = req.app.get('db')
    const {name, category, amount} = req.body
    const {user_id} = req.session.user
    // const user_id = 1

    await db.upcoming.add_upcoming([user_id, name, category, amount])

    res.sendStatus(200)
  },

  getNext: async (req, res) => {
    const db = req.app.get('db')
    const {user_id} = req.session.user
    // const user_id = 1

    const next = await db.upcoming.next_upcoming([user_id])

    res.status(200).send(next)
  }
}