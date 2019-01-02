var mongoose = require('mongoose');

const dbLink = 'mongodb://trena99:valdrin123@ds241664.mlab.com:41664/todo-app';
// const dbLink = 'mongodb://127.0.0.1:27017/TodoApp';
mongoose.Promise = global.Promise;
mongoose.connect(dbLink, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
});

module.exports = { mongoose };