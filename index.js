require('dotenv').config()
const express = require('express');
const router = require('./routes')
const PORT = process.env.PORT || 5000;
const config = require('./knexfile')[process.env.NODE_ENV || 'development'];
const knex = require('knex')(config);

const app = express();
app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.get('/todos', (req, res) => {
  knex.raw('select * from todos').then(todos => {
    res.send(todos.rows)
  })
})


app.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`)
})
