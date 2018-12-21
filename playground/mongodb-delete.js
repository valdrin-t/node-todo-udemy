const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', { useNewUrlParser: true }, (err, client) => {
    if (err) {
        return console.log('Unable to connect to mongodb server');
    }
    console.log('Connected to MongoDB server');
    const db = client.db('TodoApp');
    /*
     *  Delete One 
     */
    // db.collection('Todos').deleteMany({text: 'Eat lunch'}).then((result) =>{
    //     console.log(result);
    // }, (err) => {
    //     console.log('Unable to delete todos', err);
    // });
    /*
     *  Delete One
     */
    // db.collection('Todos').deleteOne({text: 'Something to do'}).then((result) =>{
    //     console.log(result);
    // }, (err) => {
    //     console.log('Unable to delete Todo', err);
    // });
    /*
     * Find and Delete
     * Deletes one entry and returns the deleted object to result. 
     */
    db.collection('Todos').findOneAndDelete({completed: true}).then((result) =>{
        console.log(result);
    });



    // db.collection('Todos').find().count().then((count) =>{
    //     console.log('Todos count: ', count);
    // }, (err) =>{
    //     console.log('Unable to find todos.', err);
    // });

    client.close();
});
