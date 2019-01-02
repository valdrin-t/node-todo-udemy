const {ObjectID} = require('mongodb')

const { mongoose } = require('./../server/db/mongoose');
const { Todo } = require('./../server/models/todo');

/* this will remove all todos*/
// Todo.remove({}).then((results) => {
//     
// });

//finds and removes the first document
// Todo.findOneAndRemove({}).then((todo) =>{

// });

//finds and removes the document with id
Todo.findByIdAndDelete('5c1ec60e7db1752c7c032f86').then((todo) => {
    console.log('Deleted: ', todo);
});