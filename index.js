// When you run `npm start`, runs `nodemon ./index.js` => starts listening on port 4000
// Go to localhost:4000/users in the browser to see response
// Or make requests in Postman (endpoint is localhost:4000/users)

const express = require('express')
const app = express()
const port = process.env.PORT || 4000

const { users } = require('./state')

/* BEGIN - create routes here */

app.use((req, res, next) => {
  next()
})

// GET Users
app.get('/users', (req, res) => {
  // ...perform some logic in here like getting the user data from the database...
  const returnedUsers = res.json(users)

  res.send(`Here are the users: ${returnedUsers}`) // seems like don't need this line?!?!
})

// GET a User
app.get('/users/:id', (req, res) => {
  const userId = req.params.id
  const returnedUser = res.json(users[userId - 1])

  res.send(`Here are the users: ${returnedUser}`)
})



/* END - create routes here */

app.listen(port, () => 
  console.log(`Example app listening on port ${port}!`))