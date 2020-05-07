const express = require('express')
const massive = require('massive')
require('dotenv').config()
const {SERVER_PORT, CONNECTION_STRING} = process.env
const usersCtrl = require('./controllers/usersController')
const budgetCtrl = require('./controllers/budgetController')
const expensesCtrl = require('./controllers/expensesController')
const upcomingCtrl = require('./controllers/upcomingController')

const app = express()

app.use(express.json())

app.get('/api/getUser', usersCtrl.getUser)

app.get('/api/budget', budgetCtrl.getBudget)
app.put('/api/budget', budgetCtrl.updateBudget)

app.get('/api/expenses', expensesCtrl.getExpenses)
app.get('/api/expenses/recent', expensesCtrl.getRecent)
app.get('/api/expenses/condensed', expensesCtrl.getCondensed)
app.get('/api/expenses/current', expensesCtrl.getCurrent)
app.put('/api/expenses/:id', expensesCtrl.updateExpenses)
app.post('/api/expenses/quick', expensesCtrl.quickAdd)
app.post('/api/expenses/new', expensesCtrl.addNew)

app.get('/api/upcoming', upcomingCtrl.getUpcoming)
app.post('/api/upcoming/new', upcomingCtrl.newUpcoming)

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