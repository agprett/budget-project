const dayjs = require('dayjs')

const dataTypeCheck = (data) => {
  return isNaN(data) ? false : true
}

module.exports = {
  getExpenses: async (req, res) => {
    const db = req.app.get('db')
    // const {user_id} = req.session.user
    const user_id = 1
    const limit = +req.params.limit

    const expenses = await db.expenses.get_expenses([user_id, limit])

    res.status(200).send({expenses, limit})
  },
  
  newExpense: async (req, res) => {
    const db = req.app.get('db')
    const {name, category, amount, date} = req.body
    // const {user_id} = req.session.user
    const user_id = 1

    let test = amount * 10

    if(dataTypeCheck(test)) {
      await db.expenses.new_expense([user_id, name, category, amount, date])
    
      res.sendStatus(200)
    } else {
      res.sendStatus(400)
    }
  },

  updateExpenses: async (req, res) => {
    const db = req.app.get('db')
    const {body} = req
    
    for(let i = 0; i < body.length; i++){
      const {name, date, amount, category, expense_id} = body[i]

      let test = amount * 10

      if(dataTypeCheck(test)) {
        await db.expenses.update_expense([name, date, amount, category, expense_id])
      } else {
        return res.sendStatus(400)
      }
    }

    res.sendStatus(200)
  },

  deleteExpense: async (req, res) => {
    const db = req.app.get('db')
    const {body} = req

    for(let i = 0; i < body.length; i++){
      await db.expenses.delete_expense([body[i]])
    }
    
    res.sendStatus(200)
  },

  getRecent: async (req, res) => {
    const db = req.app.get('db')
    // const {user_id} = req.session.user
    const user_id = 1

    let recents = await db.expenses.get_recent([+user_id])

    res.status(200).send(recents)
  },

  getCurrent: async (req, res) => {
    const db = req.app.get('db')
    // const {user_id} = req.session.user
    const user_id = 1
    let current = []
  
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

    res.status(200).send(current)
  },

  filterExpenses: async (req, res) => {
    const db = req.app.get('db')
    // const {user_id} = req.session.user
    const user_id = 1
    const {name, category, end, start, low, high} = req.body
    const filters = req.body

    const expenses = await db.expenses.get_expenses([user_id])

    const filtered = expenses.filter(expense => {
      if(name){
        return expense.name == name
      } else if(category){
        return expense.category == category
      } else if(start){
        console.log(start)
        return dayjs(expense.date).format('MM/DD/YY') >= dayjs(start).format('MM/DD/YY')
      } else if(end){
        console.log(end)
        return dayjs(expense.date).format('MM/DD/YY') <= dayjs(end).formant('MM/DD/YY')
      } else if(low){
        return expense.amount >= low
      } else if(high){
        return expense.amount <= high
      }
    })
      
    res.status(200).send({filtered, filters})
  }
}