module.exports = {
  getUser: async (req, res) => {
    db = req.app.get('db')

    const user = await db.users.get_user()

    res.status(200).send(user)
  }
}