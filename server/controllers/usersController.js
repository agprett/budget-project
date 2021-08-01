const bcrypt = require('bcryptjs')
const dayjs = require('dayjs')

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
  },

  getChartData: async (req, res) => {
    const db = req.app.get('db')
    // const {user_id} = req.session.user
    const user_id = 1
    let spent = 0
    let budget = 0
    let response

    [response] = await db.users.get_overall([user_id])
    budget = +response.overall

    let startMonth = dayjs().startOf('month').format()
    let endMonth = dayjs().endOf('month').format()
    
    response = await db.expenses.get_current([user_id, startMonth, endMonth])
    if(response === null){
      spent = 0
    } else {
      spent = +response[0].sum
      budget -= spent
    }

    let chartData = {budget: budget, spent: spent}
    
    res.status(200).send(chartData)
  },

  getBreakdownChartData: async (req, res) => {
    const db = req.app.get('db')
    // const {user_id} = req.session.user
    const user_id = 1
    let budgets = []
    let current = []
    let chartData = {budgets : [], spent: []}

    // let [main] = await db.users.get_overall([user_id])
    // budgets = {Overall: main.overall}

    // budgets = await db.budget.get_budget([user_id])

    // for(let i = 0; i < subBudgets.length; i++){
    //   let {category, amount} = subBudgets[i]

    //   budgets.Overall -= amount

    //   budgets = {...budgets, [category]: amount}
    // }

    budgets = await db.budget.get_budget([user_id])
    
    let startMonth = dayjs().startOf('month').format()
    let endMonth = dayjs().endOf('month').format()

    let [response] = await db.expenses.get_current([user_id, startMonth, endMonth])
    if(response.some === null){
      response.sum = 0
    }
    current.push({category: 'Overall', amount: +response.sum})
    
    let monthly = await db.expenses.get_monthly_expense([user_id, startMonth, endMonth])
    
    for(let i = 0; i < monthly.length; i++){
      monthly[i].amount = +monthly[i].sum
      delete monthly[i].sum
      current.push(monthly[i])
    }

    let tempSpent = []
    let tempBudget = budgets

    const getSpent = (category) => {
      let amount
      
      for(let i = 0; i < current.length; i++){
        if(current[i].category === category){
          return amount = (current[i].amount ? current[i].amount : 0)
        }
        amount = 0
      }
      
      return amount
    }

    for(let i = 0; i < budgets.length; i++){
      tempSpent.push({
        category: budgets[i].category,
        amount: getSpent(budgets[i].category)
      })
    }

    for(let i = 0; i < tempSpent.length; i++){
      for(let k = 0; k < tempBudget.length; k++){
        if(tempSpent[i].category === tempBudget[k].category){
          tempSpent[i].color = tempSpent[i].amount > tempBudget[k].amount ? 'red' : (
            tempSpent[i].amount / tempBudget[k].amount >= .8 ? 'yellow' : 'green'
          )
        }
      }
    }
    

    chartData = {budget: tempBudget, spent: tempSpent}

    res.status(200).send(chartData)
  },

  updateOverall: async (req, res) => {
    const db = req.app.get('db')
    // const {user_id} = req.session.user
    const user_id = 1
    let {overall} = req.params

    await db.users.update_overall([user_id, overall])

    res.sendStatus(200)
  },

  getCategories: async (req, res) => {
    const db = req.app.get('db')
    // const {user_id} = req.session.user
    const user_id = 1
    let categories = []
    
    const response = await db.users.get_categories([user_id])

    for(let i = 0; i < response.length; i++){
      categories.push(response[i].category)
    }

    res.status(200).send(categories)
  }
}