require('./config/config');

const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const { ObjectID } = require('mongodb');
const bcrypt = require('bcryptjs');

var { mongoose } = require('./db/mongoose');
var { Todo } = require('./models/todo');
var { User } = require('./models/user');
var { authenticate } = require('./middleware/authenticate');

var app = express();
const port = process.env.PORT;
//const port = process.env.PORT || 3000;

app.use(bodyParser.json()); //middleware

app.post('/todos', (req, res) => {
  var todo = new Todo({
    text: req.body.text
  });

  todo.save().then(
    doc => {
      res.send(doc);
    },
    e => {
      res.status(400).send(e);
    }
  );

  console.log(req.body);
});

app.get('/todos', (req, res) => {
  Todo.find().then(
    todos => {
      res.send({ todos });
    },
    e => {
      res.status(400).send(e);
    }
  );
});

app.get('/todos/:id', (req, res) => {
  var id = req.params.id;

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
    // console.log('ID not valid');
  }

  Todo.findById(id)
    .then(
      todo => {
        if (!todo) {
          return res.status(404).send();
        }
        res.send({ todo });
      },
      e => {
        res.status(404).send(e);
      }
    )
    .catch(e => {
      res.status(400).send(e);
      console.log(e);
    });
  //res.send(req.params);
});

app.delete('/todos/:id', (req, res) => {
  var id = req.params.id;

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  Todo.findByIdAndRemove(id)
    .then(todo => {
      if (!todo) {
        return res.status(404).send();
      }

      res.send({ todo });
    })
    .catch(e => {
      res.status(400).send();
      console.log(e);
    });
});

app.patch('/todos/:id', (req, res) => {
  var id = req.params.id;
  var body = _.pick(req.body, ['text', 'completed']);

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  if (_.isBoolean(body.completed) && body.completed) {
    body.completedAt = new Date().getTime();
  } else {
    body.completed = false;
    body.completedAt = null;
  }

  Todo.findByIdAndUpdate(id, { $set: body }, { new: true })
    .then(todo => {
      if (!todo) {
        return res.status(404).send();
      }

      res.send({ todo });
    })
    .catch(e => {
      res.status(400).send();
    });
});

// POST /users
app.post('/users', (req, res) => {
  var body = _.pick(req.body, ['email', 'password']);
  var user = new User(body);
  // var user = new User({
  //   email: body.email,
  //   password: body.password
  // });

  user
    .save()
    .then(() => {
      return user.generateAuthToken();
      //res.send(user);
    })
    .then(token => {
      res.header('x-auth', token).send(user);
    })
    .catch(e => {
      res.status(400).send(e);
    });

  console.log(user);
});

//authenticate is middleware used to see if a user is authenticated
app.get('/users/me', authenticate, (req, res) => {
  res.send(req.user);
});

//used to test to see if a user is validated (pre-refactor)
//the refactor moved this code into a middleware method
// app.get('/users/me', authenticate, (req, res) => {
//   var token = req.header('x-auth');
//
//   User.findByToken(token)
//     .then(user => {
//       if (!user) {
//         // res.status(401).send();
//         return Promise.reject();
//       }
//
//       res.send(user);
//     })
//     .catch(e => {
//       res.status(401).send();
//     });
// });

//POST /users/login {email, password} - user login functionality
//first atempt at route, refined below
// app.post('/users/login', (req, res) => {
//   var body = _.pick(req.body, ['email', 'password']);
//   //var email = body.email;
//   res.send(body); //to test that the post worked
//   User.find({
//     email: body.email
//   })
//     .then(users => {
//       if (users[0].email === body.email) {
//         console.log(body);
//         console.log('Users', users);
//         console.log(users[0].email);
//         bcrypt.compare(body.password, users[0].password, (err, res) => {
//           console.log(res);
//           console.log(users[0].tokens[0].token);
//         });
//       }
//     })
//     .catch(e => console.log(e));
// });

app.post('/users/login', (req, res) => {
  var body = _.pick(req.body, ['email', 'password']);

  User.findByCredentials(body.email, body.password)
    .then(user => {
      console.log('Success!!');
      //res.send(user);
      return user.generateAuthToken().then(token => {
        res.header('x-auth', token).send(user);
      });
    })
    .catch(e => {
      console.log('Bad request');
      res.status(400).send();
    });
});

app.listen(port, () => {
  console.log(`Started on port ${port}`);
});
// app.listen(3000, () => {
//   console.log('Started on port 3000');
// });

module.exports = { app };
