const dayjs = require('dayjs')

const dataTypeCheck = (data) => {
  return isNaN(data) ? false : true
}

module.exports = {
  getExpenses: async (req, res) => {
    const db = req.app.get('db')
    // const {user_id} = req.session.user
    const user_id = 1
    const limit = +req.query.limit || 15
    const offset = +req.query.offset || 0
    const low = +req.query.low
    const high = +req.query.high
    const {name, category, end, start} = req.query
    let filters = {}

    let expenses = await db.expenses.get_expenses([user_id, limit, offset])

    const filtered = expenses.filter(expense => {
      let bool = true

      if(name){
        filters = {...filters, name}
        bool = expense.name == name
      }
      if(category){
        filters = {...filters, category}
        bool = expense.category == category
      }
      if(start){
        filters = {...filters, start}
        bool = dayjs(expense.date).format('MM/DD/YY') >= dayjs(start).format('MM/DD/YY')
      }
      if(end){
        filters = {...filters, end}
        bool = dayjs(expense.date).format('MM/DD/YY') <= dayjs(end).formant('MM/DD/YY')
      }
      if(low){
        filters = {...filters, low}
        bool = expense.amount >= +low
      }
      if(high){
        filters = {...filters, high}
        bool = expense.amount <= +high
      }

      return bool
    })

    expenses = filtered

    res.status(200).send({expenses, limit, offset, filters})
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
    const deletedExpenses = req.body

    for(let i = 0; i < deletedExpenses.length; i++){
      await db.expenses.delete_expense([deletedExpenses[i]])
    };

    res.sendStatus(200)
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
  }
}