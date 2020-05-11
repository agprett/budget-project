const express = require('express')
const massive = require('massive')
require('dotenv').config()
const session = require('express-session')
const {SERVER_PORT, CONNECTION_STRING, SESSION_SECRET} = process.env
const path = require('path')
const usersCtrl = require('./controllers/usersController')
const budgetCtrl = require('./controllers/budgetController')
const expensesCtrl = require('./controllers/expensesController')
const upcomingCtrl = require('./controllers/upcomingController')

const app = express()

app.use(express.json())
app.use(session({
  resave: false,
  saveUninitialized: true,
  secret: SESSION_SECRET,
  cookie: {maxAge: 1000 * 60 * 60 * 24}
}))

app.get('/api/user', usersCtrl.getUser)
app.post('/api/user/new', usersCtrl.newUser)
app.post('/api/user/login', usersCtrl.loginUser)
app.post('/api/user/logout', usersCtrl.logoutUser)

app.get('/api/budget', budgetCtrl.getBudget)
app.put('/api/budget', budgetCtrl.updateBudget)

app.get('/api/expenses', expensesCtrl.getExpenses)
app.get('/api/expenses/recent', expensesCtrl.getRecent)
app.get('/api/expenses/condensed', expensesCtrl.getCondensed)
app.put('/api/expenses/condensed', expensesCtrl.updateCondensed)
app.get('/api/expenses/current', expensesCtrl.getCurrent)
app.put('/api/expenses/:id', expensesCtrl.updateExpenses)
app.post('/api/expenses/new', expensesCtrl.addNew)
app.delete('/api/expenses/:id', expensesCtrl.deleteExpense)

app.get('/api/upcoming', upcomingCtrl.getUpcoming)
app.post('/api/upcoming/new', upcomingCtrl.newUpcoming)

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