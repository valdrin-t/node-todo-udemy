// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', { useNewUrlParser: true }, (err, client) => {
    if (err) {
        return console.log('Unable to connect to mongodb server');
    }
    console.log('Connected to MongoDB server');
    const db = client.db('TodoApp');

    // db.collection('Todos').find({_id : new ObjectID('5c1b8aacc95f413f4c5bb37d')})
    // .toArray().then((docs) =>{
    //     console.log('Todos');
    //     console.log(JSON.stringify(docs, undefined, 2));
    // }, (err) =>{
    //     console.log('Unable to find todos.', err);
    // });
    db.collection('Todos').find().count().then((count) =>{
        console.log('Todos count: ', count);
    }, (err) =>{
        console.log('Unable to find todos.', err);
    });

    client.close();
});
