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

// passing in the value
router.get('/todosoneknexshortcut/:id', (req, res) => {
  knex.select()
      .from('todos')
      .where('id', req.params.id)
    .then(todos => {
      // don't put rows because it's already filtered
      res.send(todos)
    })
})

router.post('/todosraw', (req, res) => {
  // with raw numbers must be string
  knex.raw('insert into todos(id, title, user_id) values(?, ?, ?)', ['8', 'clean car', '1'])
    .then(() => {
      knex.select().from('todos')
        .then(users => {
          res.send(users)
        })
    })
    .catch((err) => console.error(err))
})

router.post('/todosknexshortcut', (req, res) => {
  knex('todos').insert({
    id: 10,
    title: "play tennis",
    user_id: 1
  })
    .then(() => {
      knex.select().from('todos')
        .then(users => {
          res.send(users)
        })
    })
    .catch((err) => console.error(err))
})

router.post('/todos', (req, res) => {
  knex('todos').insert({
    id: req.body.id,
    title: req.body.title,
    user_id: req.body.user_id
  })
    .then(() => {
      knex.select().from('todos')
        .then(users => {
          res.send(users)
        })
    })
    .catch((err) => console.error(err))
})

router.put('/todosupdateraw/:id', (req, res) => {
  knex.raw(`update todos set ${req.body.field} = ? where id = ?`, [req.body.value, req.params.id])
    .then(() => {
      knex.select().from('todos')
        .then(users => {
          res.send(users)
        })
    })
    .catch((err) => console.error(err))
})

router.put('/todosupdate/:id', function(req, res) {
  console.log("req body =>", req.body)
  knex('todos').where('id', req.params.id)
              .update({
                title: req.body.title,
                completed: req.body.completed
              })
              .then(function() {
                knex.select()
                    .from('todos')
                    .then(function(todos) {
                      res.send(todos);
                    })
              })
            .catch((err) => console.error(err))
})


module.exports = router;
