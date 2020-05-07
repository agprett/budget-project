module.exports = {
  getUpcoming: async (req, res) => {
    const db = req.app.get('db')
    const id = 1

    let upcomingPayments = await db.upcoming.get_upcoming([id])

    res.status(200).send(upcomingPayments)
  },

  newUpcoming: async(req, res) => {
    const db = req.app.get('db')
    const {name, category, amount} = req.body
    const id = 1

    await db.upcoming.add_upcoming([id, name, category, amount])

    res.sendStatus(200)
  }
}