const express = require('express');
const router = express.Router();
const config = require('../knexfile')[process.env.NODE_ENV || 'development'];
const knex = require('knex')(config);

router.get('/todosallraw', (req, res) => {
  knex.raw('select * from todos').then(todos => {
    // to filter, you can call rows
    res.send(todos.rows)
  })
})

router.get('/todosallknexshortcut', (req, res) => {
  knex.select().from('todos').then(todos => {
    // don't put rows because it's already filtered
    res.send(todos)
  })
})

router.get('/todosoneraw', (req, res) => {
  knex.raw('select * from todos where id = 1')
    .then(todos => {
      res.send(todos.rows)
    })
})

router.get('/todosoneknexshortcut', (req, res) => {
  knex.select().from('todos').where('id', 1)
    .then(todos => {
      // don't put rows because it's already filtered
      res.send(todos)
    })
})

module.exports = router;
