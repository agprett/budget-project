const bcrypt = require('bcryptjs')

module.exports = {
  getUser: async (req, res) => {
    // if(req.session.user){
    //   res.status(200).send(req.session.user)
    // } else {
    //   res.sendStatus(404)
    // }

    const db = req.app.get('db')
    const id = 1

    const [user] = await db.users.get_user([id])

    res.status(200).send(user)
  },

  newUser: async (req, res) => {
    const db = req.app.get('db')
    const {username, password} = req.body

    const [existingUser] = await db.users.check_user([username])

    if(existingUser){
      return res.status(409).send('Username taken')
    }

    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(password, salt)

    const [id] = await db.users.register_user([username, hash])

    const profile_pic = `https://robohash.org/${id.user_id}`

    const [newUser] = await db.users.update_user([id.user_id, profile_pic])

    req.session.user = newUser

    res.status(200).send(req.session.user)
  },

  loginUser: async (req, res) => {
    const db = req.app.get('db')
    const {username, password} = req.body

    const [existingUser] = await db.users.check_user([username])

    if(!existingUser){
      return res.status(404).send('Username incorrect')
    }

    const authenticated = bcrypt.compareSync(password, existingUser.password)

    if(authenticated){
      delete existingUser.password

      req.session.user = existingUser

      res.status(200).send(req.session.user)
    } else {
      res.status(404).send('Password incorrect')
    }
  },

  logoutUser: (req, res) => {
    req.session.destroy()
    res.sendStatus(200)
  }
}