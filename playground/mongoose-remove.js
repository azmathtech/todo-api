const { ObjectID } = require('mongodb');

const { mongoose } = require('./../server/db/mongoose');
const { Todo } = require('./../server/models/todo');
const { User } = require('./../server/models/user');

// Todo.remove({}).then(result => {
//   console.log(result);
// });

Todo.findOneAndRemove({ _id: '5be364cee11e8739bf4af87c' }).then(todo => {
  console.log(todo);
});

Todo.findByIdAndRemove('5be364cee11e8739bf4af87c').then(todo => {
  console.log(todo);
});
