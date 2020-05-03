const express = require('express')
const massive = require('massive')
require('dotenv').config()
const {SERVER_PORT, CONNECTION_STRING} = process.env
const usersCtrl = require('./controllers/usersController')
const budgetCtrl = require('./controllers/budgetController')
const expensesCtrl = require('./controllers/expensesController')

const app = express()

app.use(express.json())

app.get('/api/getUser', usersCtrl.getUser)

app.get('/api/budget', budgetCtrl.getBudget)
app.put('/api/budget', budgetCtrl.updateBudget)

app.get('/api/expenses', expensesCtrl.getExpenses)
app.get('/api/recent', expensesCtrl.getRecent)
app.put('/api/expenses/:id', expensesCtrl.updateExpenses)
app.post('/api/quick-add', expensesCtrl.quickAdd)

massive({
  connectionString: CONNECTION_STRING,
  ssl: {
    rejectUnauthorized: false
  }
}).then(dbInstance => {
  app.set('db', dbInstance)
  console.log('DB connected')
  app.listen(SERVER_PORT, () => console.log(`Docked at port ${SERVER_PORT}`))
})