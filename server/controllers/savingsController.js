module.exports = {
  updateSavings: async (req, res) => {
    const db = req.app.get('db')
    // const {user_id} = req.session.user
    const user_id = 1
    const {overall} = req.params
    
    await db.savings.update_overall_savings([overall, user_id])
    res.sendStatus(200)
  }
}