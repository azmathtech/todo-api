//code to use if mongodb is upgraded to version 3, the later version than used
//by andrews course

const MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
  if (err) {
    return console.log('Unable to connect to MongoDB server');
  }
  console.log('Connected to MongoDB server');
  const db = client.db('TodoApp');

  // db.collection('Todos').insertOne({
  //   text: 'Something to do',
  //   completed: false
  // }, (err, result) => {
  //   if (err) {
  //     return console.log('Unable to insert todo', err);
  //   }
  //
  //   console.log(JSON.stringify(result.ops, undefined, 2));
  // });

  db.collection('Users').insertOne({
    name: 'Michael',
    age: 41,
    location: 'Chandler'
  }, (err, result) => {
    if (err) {
      return console.log('Unable to insert user', err);
    }

    console.log(JSON.stringify(result.ops, undefined, 2));
  });

  client.close();
});
