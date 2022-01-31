const express = require('express')
const massive = require('massive')
require('dotenv').config()
const session = require('express-session')
const {SERVER_PORT, CONNECTION_STRING, SESSION_SECRET} = process.env
const path = require('path')
const usersCtrl = require('./controllers/usersController')
const budgetCtrl = require('./controllers/budgetController')
const expensesCtrl = require('./controllers/expensesController')
const savingsCtrl = require('./controllers/savingsController')
const debtsCtrl = require('./controllers/debtsController')
const recurringCtrl = require('./controllers/recurringController')

const app = express()

app.use(express.json())
app.use(session({
  resave: true,
  saveUninitialized: false,
  secret: SESSION_SECRET,
  cookie: {maxAge: 1000 * 60 * 60 * 24}
}))

app.get('/api/user', usersCtrl.getUser)
app.post('/api/user/register', usersCtrl.registerUser)
app.post('/api/user/login', usersCtrl.loginUser)
app.delete('/api/user', usersCtrl.logoutUser)
app.get('/api/user/categories', usersCtrl.getCategories)

app.get('/api/budget', budgetCtrl.getBudget)
app.post('/api/budget', budgetCtrl.newBudget)
app.put('/api/budget', budgetCtrl.updateBudget)
app.delete('/api/budget/:id', budgetCtrl.deleteBudget)

app.get('/api/expenses', expensesCtrl.getExpenses)
app.post('/api/expenses', expensesCtrl.newExpense)
app.put('/api/expenses', expensesCtrl.updateExpenses)
app.delete('/api/expenses', expensesCtrl.deleteExpense)
app.get('/api/current', expensesCtrl.getCurrent)

app.get('/api/recurring/:limit', recurringCtrl.getRecurring)
app.post('/api/recurring', recurringCtrl.newRecurring)
app.put('/api/recurring', recurringCtrl.updateRecurring)
app.post('/api/recurring/:id', recurringCtrl.deleteRecurring)
app.put('/api/recurring/date', recurringCtrl.updateRecurringDate)

app.get('/api/savings', savingsCtrl.getSavings)
app.put('/api/savings/:overall', savingsCtrl.updateSavings)
app.get('/api/goals', savingsCtrl.getGoals)
app.post('/api/goals', savingsCtrl.newGoal)
app.put('/api/goals', savingsCtrl.updateGoal)
app.get('/api/goals/:id', savingsCtrl.getPriority)

app.get('/api/debts', debtsCtrl.getDebts)
app.post('/api/debts', debtsCtrl.newDebt)
app.put('/api/debts/:id', debtsCtrl.updateDebts)
app.get('/api/total', debtsCtrl.getTotal)
app.get('/api/upcoming', debtsCtrl.getUpcoming)

app.use(express.static(__dirname + '/../build'))

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../build/index.html'))
})

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