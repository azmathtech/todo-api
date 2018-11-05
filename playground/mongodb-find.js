//const MongoClient = require('mongodb').MongoClient;
const { MongoClient, ObjectID } = require('mongodb'); //destructuring the line above

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
    return console.log('Unable to connect to MongoDB server');
  }
  console.log('Connected to MongoDB server');

  // will display the entire collection (table)
  // db.collection('Todos').find().toArray().then(
  //   docs => {
  //     console.log('Todos');
  //     console.log(JSON.stringify(docs, undefined, 2));
  //   },
  //   err => {
  //     console.log('Unable to fetch todos', err);
  //   }
  // );

  // this will query the values based on completed: false
  // db.collection('Todos').find({ completed: false }).toArray().then(
  //   docs => {
  //     console.log('Todos');
  //     console.log(JSON.stringify(docs, undefined, 2));
  //   },
  //   err => {
  //     console.log('Unable to fetch todos', err);
  //   }
  // );

  //searching collection by id
  // db
  //   .collection('Todos')
  //   .find({
  //     _id: new ObjectID('5be09f70a5a08830016e5771')
  //   })
  //   .toArray()
  //   .then(
  //     docs => {
  //       console.log('Todos');
  //       console.log(JSON.stringify(docs, undefined, 2));
  //     },
  //     err => {
  //       console.log('Unable to fetch todos', err);
  //     }
  //   );

  //counts the number of records in the collection
  // db.collection('Todos').find().count().then(
  //   count => {
  //     console.log(`Todos count: ${count}`);
  //   },
  //   err => {
  //     console.log('Unable to fetch todos', err);
  //   }
  // );

  //quering the Users collection to search for entrys with Michael as the name
  db.collection('Users').find({ name: 'Michael' }).toArray().then(
    docs => {
      console.log('Search Results:');
      console.log(JSON.stringify(docs, undefined, 2));
    },
    err => {
      console.log('Unable to locate the query', err);
    }
  );

  // db.close();
});
