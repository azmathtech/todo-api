const { ObjectID } = require('mongodb');

const { mongoose } = require('./../server/db/mongoose');
const { Todo } = require('./../server/models/todo');
const { User } = require('./../server/models/user');

// var id = '5be329de986d0eea5bb7d61711';
// //5be329de986d0eea5bb7d617
//
// if (!ObjectID.isValid(id)) {
//   console.log('ID not valid');
// }

// Todo.find({
//   _id: id
// }).then(todos => {
//   console.log('Todos', todos);
// });
//
// Todo.findOne({
//   _id: id
// }).then(todo => {
//   console.log('Todo', todo);
// });

// Todo.findById(id)
//   .then(todo => {
//     if (!todo) {
//       return console.log('Id not found');
//     }
//     console.log('Todo By Id', todo);
//   })
//   .catch(e => console.log(e));

var id = '5be2109195d55f0d4946905b';

if (!ObjectID.isValid(id)) {
  console.log('ID not valid');
}

User.find({
  _id: id
})
  .then(users => {
    console.log('Users', users);
  })
  .catch(e => console.log(e));

User.findOne({
  _id: id
})
  .then(user => {
    console.log('User', user);
  })
  .catch(e => console.log(e));

User.findById(id)
  .then(user => {
    if (!user) {
      return console.log('Id not found');
    }
    console.log(JSON.stringify(user, undefined, 2));
  })
  .catch(e => console.log(e));
