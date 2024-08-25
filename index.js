// When you run `npm start`, runs `nodemon ./index.js` => starts listening on port 4000
// Go to localhost:4000/users in the browser to see response
// Or make requests in Postman (endpoint is localhost:4000/users)

// When you import an object from another file in Node.js, you’re importing a reference to that object. 
// This means that if you modify the object in one file (e.g., by pushing new elements to it), those changes should be reflected in other files that import the same object
// When the server restarts (e.g. you change the file, manually end the server), the object reference "resets itself"

const bodyParser = require('body-parser')
const express = require('express')
const app = express()
const port = process.env.PORT || 4000

// Middleware to parse incoming requests with JSON payloads (i.e. JSON bodies) (else req.body will be null)
// If had other types of payloads, like URL-encoded request bodies in form submissions, would have to parse those, e.g. `app.use(bodyParser.urlencoded({ extended: true }))`
app.use(bodyParser.json()); // NOTE: this is equivalent `app.use(express.json());`

const { users } = require('./state')

/* BEGIN - create routes here */

app.use((req, res, next) => {
  next()
})

// GET Users
app.get('/users', (req, res) => {  // JS Basics: Even if you don't use req, res needs to be the 2nd argument 
  // ...perform some logic in here like getting the user data from the database...
  res.json(users)

})

// GET a User
app.get('/users/:id', (req, res) => {
  const userId = req.params.id
  res.json(users[userId - 1])
})

// POST a pre-defined User
app.post('/users/predefined', (req, res) => {
  
  const userId = users.length + 1

  const newUser = {
    "_id": userId,
    "name": "A D",
    "occupation": "Writer",
    "avatar": "https://upload.wikimedia.org/wikipedia/en/5/50/Agentdalecooper.jpg"
  }
  
  // add to users array in state.js
  users.push(newUser)

  // Sends a JSON response to the client
  // Automatically sets the Content-Type header to application/json
  // Ends the response, so no further code related to sending a response (e.g. res.send() ) will be executed.
  res.json(users[users.length - 1])

})

// POST a User
app.post('/users', (req, res) => {
  
  // Note: if you do it like this, `_id` won't be the first property
  // users.push(req.body)
  // users[users.length - 1]._id = users.length

  const userId = users.length + 1

  const newUser = {
    _id: userId,  // _id is set as the first property
    ...req.body   // Spread the properties from req.body into the new object
  };

  users.push(newUser)

  res.json(users)

})

app.put('/users/1', (req, res) => {

  users[0].name = "Billy"

  res.json(users[0])
})

app.delete('/users/1', (req, res) => {

  users.shift()

  res.send(`user deleted. users is now ${JSON.stringify(users)}`)
})

/* END - create routes here */

app.listen(port, () => 
  console.log(`Example app listening on port ${port}!`))
